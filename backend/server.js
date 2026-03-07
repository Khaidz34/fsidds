require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Supabase ────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ─── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:3001',
    'http://127.0.0.1:5500'
  ],
  credentials: true
}));
app.use(express.json());

// ─── Auth Middleware ─────────────────────────────────────────
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Chưa đăng nhập' });
  }
  try {
    const decoded = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Token không hợp lệ' });
  }
}

function adminMiddleware(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Chỉ admin mới có quyền này' });
  }
  next();
}

async function getOrderStatsByUserForMonth(month) {
  const { data, error } = await supabase
    .from('orders')
    .select('ordered_for, price, receiver:ordered_for(id, fullname)')
    .eq('month', month);
  if (error) throw new Error(error.message);

  const stats = {};
  (data || []).forEach(o => {
    const key = o.ordered_for;
    if (!stats[key]) {
      stats[key] = { userId: key, fullname: o.receiver?.fullname || '—', ordersCount: 0, ordersTotal: 0 };
    }
    stats[key].ordersCount++;
    stats[key].ordersTotal += o.price || 0;
  });
  return stats;
}

// ─── Health Check ────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', app: 'FSI DDS Backend', time: new Date().toISOString() });
});

// ════════════════════════════════════════════════════════════
// AUTH ROUTES
// ════════════════════════════════════════════════════════════

// Đăng ký
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, fullname } = req.body;
    if (!username || !password || !fullname) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' });
    }
    if (/\s/.test(username)) {
      return res.status(400).json({ error: 'Tên đăng nhập không được có khoảng trắng' });
    }

    // Kiểm tra username đã tồn tại
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (existing) {
      return res.status(409).json({ error: 'Tên đăng nhập đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({ username, password: hashedPassword, fullname, role: 'user' })
      .select('id, username, fullname, role')
      .single();

    if (error) throw error;

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, fullname: newUser.fullname, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({ user: newUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// Đăng nhập
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, fullname: user.fullname, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      user: { id: user.id, username: user.username, fullname: user.fullname, role: user.role },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// Lấy thông tin bản thân
app.get('/api/auth/me', authMiddleware, async (req, res) => {
  const { data: user } = await supabase
    .from('users')
    .select('id, username, fullname, role')
    .eq('id', req.user.id)
    .single();
  res.json(user);
});

// Đổi mật khẩu - không cần token (cho trang quên mật khẩu)
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    if (!username || !newPassword) {
      return res.status(400).json({ error: 'Tên đăng nhập và mật khẩu mới là bắt buộc' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' });
    }

    // Kiểm tra user tồn tại
    const { data: user, error: userErr } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (userErr || !user) {
      return res.status(404).json({ error: 'Tài khoản không tồn tại' });
    }

    // Hash password mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const { error: updateErr } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', user.id);

    if (updateErr) throw updateErr;

    res.json({ success: true, message: 'Mật khẩu đã được cập nhật' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// ════════════════════════════════════════════════════════════
// USERS ROUTES
// ════════════════════════════════════════════════════════════

// Lấy danh sách users (để điền dropdown "đặt cho ai")
app.get('/api/users', authMiddleware, async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, fullname, role')
    .order('fullname');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Admin: đổi role
app.patch('/api/users/:id/role', authMiddleware, adminMiddleware, async (req, res) => {
  const { role } = req.body;
  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ error: 'Role không hợp lệ' });
  }
  if (parseInt(req.params.id) === req.user.id) {
    return res.status(400).json({ error: 'Không thể đổi role của chính mình' });
  }
  const { data, error } = await supabase
    .from('users')
    .update({ role })
    .eq('id', req.params.id)
    .select('id, username, fullname, role')
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Admin: xóa user
app.delete('/api/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  if (parseInt(req.params.id) === req.user.id) {
    return res.status(400).json({ error: 'Không thể xóa tài khoản của chính mình' });
  }
  const { error } = await supabase.from('users').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ════════════════════════════════════════════════════════════
// MENU ROUTES
// ════════════════════════════════════════════════════════════

// Lấy menu hôm nay
app.get('/api/menu/today', authMiddleware, async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('menus')
    .select('*, dishes(*)')
    .eq('date', today)
    .single();

  if (error || !data) {
    return res.json({ date: today, dishes: [], imageUrl: '' });
  }

  res.json({
    id: data.id,
    date: data.date,
    imageUrl: data.image_url || '',
    dishes: data.dishes.map(d => ({ id: d.id, name: d.name, order: d.sort_order }))
      .sort((a, b) => a.order - b.order)
  });
});

// Admin: đăng menu
app.post('/api/menu', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { dishes, imageUrl } = req.body;
    if (!dishes || !Array.isArray(dishes) || dishes.length === 0) {
      return res.status(400).json({ error: 'Danh sách món không được trống' });
    }

    const today = new Date().toISOString().split('T')[0];

    // Xóa menu cũ của hôm nay nếu có
    const { data: oldMenu } = await supabase
      .from('menus')
      .select('id')
      .eq('date', today)
      .single();

    if (oldMenu) {
      await supabase.from('dishes').delete().eq('menu_id', oldMenu.id);
      await supabase.from('menus').delete().eq('id', oldMenu.id);
    }

    // Tạo menu mới
    const { data: menu, error: menuErr } = await supabase
      .from('menus')
      .insert({ date: today, image_url: imageUrl || null, created_by: req.user.id })
      .select()
      .single();

    if (menuErr) throw menuErr;

    // Thêm các món
    const dishRows = dishes.map((name, i) => ({
      menu_id: menu.id,
      name: name.trim(),
      sort_order: i + 1
    }));

    const { data: insertedDishes, error: dishErr } = await supabase
      .from('dishes')
      .insert(dishRows)
      .select();

    if (dishErr) throw dishErr;

    res.json({
      id: menu.id,
      date: menu.date,
      imageUrl: menu.image_url || '',
      dishes: insertedDishes.map(d => ({ id: d.id, name: d.name, order: d.sort_order }))
        .sort((a, b) => a.order - b.order)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi đăng menu' });
  }
});

// ════════════════════════════════════════════════════════════
// ORDERS ROUTES
// ════════════════════════════════════════════════════════════

// Lấy đơn hôm nay (admin: tất cả, user: của mình)
app.get('/api/orders/today', authMiddleware, async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  let query = supabase
    .from('orders')
    .select(`
      id, ordered_by, ordered_for, price, date, notes, rating, created_at,
      dish1:dish1_id(id, name),
      dish2:dish2_id(id, name),
      orderer:ordered_by(id, fullname),
      receiver:ordered_for(id, fullname)
    `)
    .eq('date', today)
    .order('created_at', { ascending: false });

  if (req.user.role !== 'admin') {
    query = query.eq('ordered_by', req.user.id);
  }

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Lấy đơn của tôi theo tháng
app.get('/api/orders/my', authMiddleware, async (req, res) => {
  const month = req.query.month || new Date().toISOString().slice(0, 7);
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id, ordered_by, ordered_for, price, date, notes, rating, created_at,
      dish1:dish1_id(id, name),
      dish2:dish2_id(id, name),
      orderer:ordered_by(id, fullname)
    `)
    .eq('ordered_for', req.user.id)
    .gte('date', `${month}-01`)
    .lte('date', `${month}-31`)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Đặt cơm (chọn 2 món)
app.post('/api/orders', authMiddleware, async (req, res) => {
  try {
    const { dish1Id, dish2Id, orderedFor, notes, rating } = req.body;

    if (!dish1Id) {
      return res.status(400).json({ error: 'Vui lòng chọn ít nhất 1 món' });
    }
    if (dish2Id && dish1Id === dish2Id) {
      return res.status(400).json({ error: '2 món phải khác nhau' });
    }
    if (!orderedFor) {
      return res.status(400).json({ error: 'Vui lòng chọn người ăn' });
    }
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Đánh giá phải từ 1-5 sao' });
    }

    // Kiểm tra món(s) thuộc menu hôm nay
    const today = new Date().toISOString().split('T')[0];
    const { data: menu } = await supabase
      .from('menus')
      .select('id')
      .eq('date', today)
      .single();

    if (!menu) {
      return res.status(400).json({ error: 'Hôm nay chưa có menu' });
    }

    const dishIds = dish2Id ? [dish1Id, dish2Id] : [dish1Id];
    const { data: validDishes } = await supabase
      .from('dishes')
      .select('id')
      .eq('menu_id', menu.id)
      .in('id', dishIds);

    if (!validDishes || validDishes.length !== dishIds.length) {
      return res.status(400).json({ error: 'Món không hợp lệ' });
    }

    // Lấy tháng hiện tại
    const month = today.slice(0, 7);

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        ordered_by: req.user.id,
        ordered_for: parseInt(orderedFor),
        dish1_id: dish1Id,
        dish2_id: dish2Id || null,
        notes: notes || null,
        rating: rating || null,
        price: 40000,
        date: today,
        month
      })
      .select(`
        id, price, date, notes, rating, created_at,
        dish1:dish1_id(id, name),
        dish2:dish2_id(id, name),
        orderer:ordered_by(id, fullname),
        receiver:ordered_for(id, fullname)
      `)
      .single();

    if (error) throw error;

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi đặt cơm' });
  }
});

// Admin: xóa đơn
app.delete('/api/orders/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { error } = await supabase.from('orders').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ════════════════════════════════════════════════════════════
// STATISTICS ROUTES
// ════════════════════════════════════════════════════════════

// Thống kê tháng
app.get('/api/stats/month', authMiddleware, adminMiddleware, async (req, res) => {
  const month = req.query.month || new Date().toISOString().slice(0, 7);

  const { data, error } = await supabase
    .from('orders')
    .select('ordered_for, price, receiver:ordered_for(id, fullname)')
    .eq('month', month);

  if (error) return res.status(500).json({ error: error.message });

  const stats = {};
  data.forEach(o => {
    const key = o.ordered_for;
    if (!stats[key]) {
      stats[key] = { userId: key, fullname: o.receiver.fullname, count: 0, total: 0 };
    }
    stats[key].count++;
    stats[key].total += o.price;
  });

  res.json(Object.values(stats).sort((a, b) => b.count - a.count));
});

// Thống kê tuần
app.get('/api/stats/week', authMiddleware, adminMiddleware, async (req, res) => {
  const now = new Date();
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }

  const { data, error } = await supabase
    .from('orders')
    .select('ordered_for, price, date, receiver:ordered_for(id, fullname)')
    .in('date', dates);

  if (error) return res.status(500).json({ error: error.message });

  const stats = {};
  data.forEach(o => {
    const key = o.ordered_for;
    if (!stats[key]) {
      stats[key] = { userId: key, fullname: o.receiver.fullname, count: 0 };
    }
    stats[key].count++;
  });

  res.json(Object.values(stats).sort((a, b) => b.count - a.count));
});

// Dashboard summary
app.get('/api/stats/dashboard', authMiddleware, async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const month = today.slice(0, 7);

  const [todayOrders, monthOrders] = await Promise.all([
    supabase.from('orders').select('ordered_for, dish1:dish1_id(name), dish2:dish2_id(name)').eq('date', today),
    supabase.from('orders').select('price').eq('month', month)
  ]);

  const dishCount = {};
  (todayOrders.data || []).forEach(o => {
    if (o.dish1) dishCount[o.dish1.name] = (dishCount[o.dish1.name] || 0) + 1;
    if (o.dish2) dishCount[o.dish2.name] = (dishCount[o.dish2.name] || 0) + 1;
  });

  const topDishes = Object.entries(dishCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));

  const uniquePeople = new Set((todayOrders.data || []).map(o => o.ordered_for)).size;
  const monthRevenue = (monthOrders.data || []).reduce((s, o) => s + o.price, 0);

  res.json({
    todayCount: (todayOrders.data || []).length,
    uniquePeople,
    monthRevenue,
    topDishes
  });
});

// ════════════════════════════════════════════════════════════
// PAYMENT ROUTES
// ════════════════════════════════════════════════════════════

// Lấy trạng thái thanh toán
app.get('/api/payments', authMiddleware, adminMiddleware, async (req, res) => {
  const month = req.query.month || new Date().toISOString().slice(0, 7);

  try {
    const [paymentsRes, ordersStats] = await Promise.all([
      supabase.from('payments').select('user_id, month, paid_at, paid_count, paid_total').eq('month', month),
      getOrderStatsByUserForMonth(month)
    ]);

    const paidMap = {};
    (paymentsRes.data || []).forEach(p => { paidMap[p.user_id] = p; });

    const result = Object.values(ordersStats).map(s => {
      const paidEntry = paidMap[s.userId];
      const paidCount = paidEntry?.paid_count || 0;
      const paidTotal = paidEntry?.paid_total || 0;
      const remainingCount = Math.max(0, (s.ordersCount || 0) - paidCount);
      const remainingTotal = Math.max(0, (s.ordersTotal || 0) - paidTotal);
      return {
        userId: s.userId,
        fullname: s.fullname,
        ordersCount: s.ordersCount,
        ordersTotal: s.ordersTotal,
        paidCount,
        paidTotal,
        remainingCount,
        remainingTotal,
        paidAt: paidEntry?.paid_at || null
      };
    });

    // include users that have payment but no orders (edge)
    (paymentsRes.data || []).forEach(p => {
      if (ordersStats[p.user_id]) return;
      result.push({
        userId: p.user_id,
        fullname: '—',
        ordersCount: 0,
        ordersTotal: 0,
        paidCount: p.paid_count || 0,
        paidTotal: p.paid_total || 0,
        remainingCount: 0,
        remainingTotal: 0,
        paidAt: p.paid_at || null
      });
    });

    // sort by remainingTotal desc then name
    result.sort((a, b) => (b.remainingTotal - a.remainingTotal) || (a.fullname || '').localeCompare((b.fullname || ''), 'vi'));
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Lỗi lấy thanh toán' });
  }
});

// Người dùng: trạng thái thanh toán của chính mình
app.get('/api/payments/my', authMiddleware, async (req, res) => {
  const month = req.query.month || new Date().toISOString().slice(0, 7);
  try {
    const [ordersRes, payRes] = await Promise.all([
      supabase.from('orders').select('price', { count: 'exact', head: false }).eq('month', month).eq('ordered_for', req.user.id),
      supabase.from('payments').select('paid_at, paid_count, paid_total').eq('month', month).eq('user_id', req.user.id).maybeSingle()
    ]);

    const ordersCount = ordersRes.count || 0;
    const ordersTotal = (ordersRes.data || []).reduce((s, o) => s + (o.price || 0), 0);
    const paidCount = payRes.data?.paid_count || 0;
    const paidTotal = payRes.data?.paid_total || 0;
    const remainingCount = Math.max(0, ordersCount - paidCount);
    const remainingTotal = Math.max(0, ordersTotal - paidTotal);

    res.json({
      month,
      ordersCount,
      ordersTotal,
      paidCount,
      paidTotal,
      remainingCount,
      remainingTotal,
      paidAt: payRes.data?.paid_at || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi lấy trạng thái thanh toán' });
  }
});

// Admin: lịch sử thanh toán theo tháng
app.get('/api/payments/history', authMiddleware, adminMiddleware, async (req, res) => {
  const month = req.query.month || new Date().toISOString().slice(0, 7);
  try {
    const { data, error } = await supabase
      .from('payment_logs')
      .select(`
        id, user_id, month, paid_count, paid_total, paid_at,
        user:user_id(id, fullname),
        confirmer:confirmed_by(id, fullname)
      `)
      .eq('month', month)
      .order('paid_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi lấy lịch sử thanh toán' });
  }
});

// ════════════════════════════════════════════════════════════
// INVOICE ROUTES
// ════════════════════════════════════════════════════════════

// Admin: dữ liệu hóa đơn theo tháng (để frontend xuất PDF)
app.get('/api/invoices/month', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const month = req.query.month || new Date().toISOString().slice(0, 7);
    if (!/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({ error: 'Month không hợp lệ (định dạng YYYY-MM)' });
    }

    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, date, price, created_at,
        dish1:dish1_id(id, name),
        dish2:dish2_id(id, name),
        receiver:ordered_for(id, fullname)
      `)
      .eq('month', month)
      .order('date', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    const map = {};
    (data || []).forEach(o => {
      const uid = o.receiver?.id;
      if (!uid) return;
      if (!map[uid]) {
        map[uid] = {
          userId: uid,
          fullname: o.receiver.fullname,
          count: 0,
          total: 0,
          orders: []
        };
      }
      map[uid].count++;
      map[uid].total += o.price || 0;
      map[uid].orders.push({
        id: o.id,
        date: o.date,
        created_at: o.created_at,
        price: o.price || 0,
        dish1: o.dish1 || null,
        dish2: o.dish2 || null
      });
    });

    const users = Object.values(map).sort((a, b) =>
      (a.fullname || '').localeCompare((b.fullname || ''), 'vi')
    );

    res.json({
      month,
      unitPrice: 40000,
      generatedAt: new Date().toISOString(),
      users
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi xuất hóa đơn' });
  }
});

// Admin: xác nhận đã thanh toán
app.post('/api/payments/mark-paid', authMiddleware, adminMiddleware, async (req, res) => {
  const { userId, month } = req.body;
  if (!userId || !month) return res.status(400).json({ error: 'Thiếu thông tin' });

  try {
    // Snapshot tại thời điểm bấm thanh toán (suất + tiền)
    const { data: orders, error: ordErr } = await supabase
      .from('orders')
      .select('price')
      .eq('month', month)
      .eq('ordered_for', userId);
    if (ordErr) return res.status(500).json({ error: ordErr.message });

    const paidCount = (orders || []).length;
    const paidTotal = (orders || []).reduce((s, o) => s + (o.price || 0), 0);
    const paidAt = new Date().toISOString();

    // Cập nhật trạng thái thanh toán hiện tại (last snapshot)
    const up = await supabase
      .from('payments')
      .upsert({
        user_id: userId,
        month,
        paid_count: paidCount,
        paid_total: paidTotal,
        paid_at: paidAt,
        confirmed_by: req.user.id
      }, { onConflict: 'user_id,month' })
      .select()
      .single();
    if (up.error) return res.status(500).json({ error: up.error.message });

    // Ghi lịch sử (audit)
    const ins = await supabase
      .from('payment_logs')
      .insert({
        user_id: userId,
        month,
        paid_count: paidCount,
        paid_total: paidTotal,
        paid_at: paidAt,
        confirmed_by: req.user.id
      })
      .select()
      .single();
    if (ins.error) return res.status(500).json({ error: ins.error.message });

    res.json({ payment: up.data, log: ins.data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Lỗi xác nhận thanh toán' });
  }
});

// ════════════════════════════════════════════════════════════
// REVIEWS ROUTES
// ════════════════════════════════════════════════════════════

// Admin: Lấy tất cả đánh giá hôm nay
app.get('/api/reviews/today', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, date, rating, notes, created_at,
        receiver:ordered_for(id, fullname),
        dish1:dish1_id(id, name),
        dish2:dish2_id(id, name),
        orderer:ordered_by(id, fullname)
      `)
      .eq('date', today)
      .not('rating', 'is', null)
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi lấy đánh giá' });
  }
});

// ─── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ FSI DDS Backend đang chạy tại port ${PORT}`);
});
