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
      id, ordered_by, ordered_for, price, created_at,
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
      id, ordered_by, ordered_for, price, date, created_at,
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
    const { dish1Id, dish2Id, orderedFor } = req.body;

    if (!dish1Id || !dish2Id) {
      return res.status(400).json({ error: 'Vui lòng chọn đúng 2 món' });
    }
    if (dish1Id === dish2Id) {
      return res.status(400).json({ error: '2 món phải khác nhau' });
    }
    if (!orderedFor) {
      return res.status(400).json({ error: 'Vui lòng chọn người ăn' });
    }

    // Kiểm tra 2 món thuộc menu hôm nay
    const today = new Date().toISOString().split('T')[0];
    const { data: menu } = await supabase
      .from('menus')
      .select('id')
      .eq('date', today)
      .single();

    if (!menu) {
      return res.status(400).json({ error: 'Hôm nay chưa có menu' });
    }

    const { data: validDishes } = await supabase
      .from('dishes')
      .select('id')
      .eq('menu_id', menu.id)
      .in('id', [dish1Id, dish2Id]);

    if (!validDishes || validDishes.length !== 2) {
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
        dish2_id: dish2Id,
        price: 40000,
        date: today,
        month
      })
      .select(`
        id, price, date, created_at,
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

  const [paymentsRes, ordersRes] = await Promise.all([
    supabase.from('payments').select('*').eq('month', month),
    supabase.from('orders').select('ordered_for, price, receiver:ordered_for(id, fullname)').eq('month', month)
  ]);

  const orderStats = {};
  (ordersRes.data || []).forEach(o => {
    const key = o.ordered_for;
    if (!orderStats[key]) orderStats[key] = { userId: key, fullname: o.receiver.fullname, count: 0, total: 0 };
    orderStats[key].count++;
    orderStats[key].total += o.price;
  });

  const paidMap = {};
  (paymentsRes.data || []).forEach(p => { paidMap[p.user_id] = p; });

  const result = Object.values(orderStats).map(s => ({
    ...s,
    paid: !!paidMap[s.userId],
    paidAt: paidMap[s.userId]?.paid_at || null
  }));

  res.json(result.sort((a, b) => b.count - a.count));
});

// Admin: xác nhận đã thanh toán
app.post('/api/payments/mark-paid', authMiddleware, adminMiddleware, async (req, res) => {
  const { userId, month } = req.body;
  if (!userId || !month) return res.status(400).json({ error: 'Thiếu thông tin' });

  const { data, error } = await supabase
    .from('payments')
    .upsert({ user_id: userId, month, paid_at: new Date().toISOString(), confirmed_by: req.user.id })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ─── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ FSI DDS Backend đang chạy tại port ${PORT}`);
});
