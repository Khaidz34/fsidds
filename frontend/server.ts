import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("dining.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    role TEXT,
    avatar TEXT,
    debt INTEGER DEFAULT 0,
    paid INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    name_vi TEXT,
    name_en TEXT,
    name_ja TEXT,
    desc_vi TEXT,
    desc_en TEXT,
    desc_ja TEXT,
    price INTEGER,
    category TEXT,
    image TEXT,
    available INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    user_name TEXT,
    item_ids TEXT,
    item_names TEXT,
    order_date TEXT,
    status TEXT,
    price INTEGER,
    more_rice INTEGER,
    less_rice INTEGER,
    more_soup INTEGER,
    more_chopsticks INTEGER,
    more_chili INTEGER,
    custom_note TEXT
  );
`);

// Seed Initial Data if empty
const userCount = db.prepare("SELECT count(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  db.prepare("INSERT INTO users (id, name, email, role, avatar, debt, paid) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    'u1', 'Nguyễn Văn An', 'an.nv@company.com', 'employee', 'https://api.dicebear.com/7.x/avataaars/svg?seed=An', 120000, 480000
  );
  db.prepare("INSERT INTO users (id, name, email, role, avatar, debt, paid) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    'u2', 'Sato Kenji', 'kenji.sato@company.com', 'admin', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji', 0, 0
  );

  const initialMenu = [
    ['m1', 'Thịt viên nấm sốt cà chua', 'Meatballs with mushroom in tomato sauce', 'マッシュルーム入り肉団子のトマトソース煮', 'Thịt viên mềm ngọt với nấm hương và sốt cà chua đậm đà.', 'Tender meatballs with shiitake mushrooms and rich tomato sauce.', '椎茸入りの柔らかい肉団子と濃厚なトマトソース。', 40000, 'vietnamese', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800'],
    ['m2', 'Nem hải sản', 'Seafood spring rolls', 'シーフード春巻き', 'Nem chiên giòn rụm với nhân hải sản tươi ngon.', 'Crispy fried spring rolls with fresh seafood filling.', '新鮮なシーフードがたっぷり入ったサクサクの揚げ春巻き。', 40000, 'vietnamese', 'https://images.unsplash.com/photo-1606330942587-6f0685303770?auto=format&fit=crop&q=80&w=800'],
    ['m3', 'Gà rang muối', 'Salt-roasted chicken', '鶏肉の塩炒め', 'Gà chiên giòn xóc muối sả thơm lừng.', 'Crispy fried chicken tossed with aromatic lemongrass salt.', '香り高いレモングラスソルトをまぶしたサクサクの唐揚げ。', 40000, 'vietnamese', 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800'],
    ['m4', 'Đậu phụ hấp sốt xì dầu thịt xay', 'Steamed tofu with soy sauce and minced meat', '豆腐の蒸し物 挽肉と醤油ソース', 'Đậu phụ non mềm mịn hấp cùng thịt băm và sốt xì dầu.', 'Silky soft tofu steamed with minced meat and soy sauce.', '挽肉と醤油ソースで蒸した絹ごし豆腐。', 40000, 'vietnamese', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'],
    ['m5', 'Cá diêu hồng lọc thịt chiên giòn', 'Crispy fried red tilapia fillets', 'レッドティラピアのフィレ唐揚げ', 'Phi lê cá diêu hồng chiên giòn tan, ăn kèm nước mắm chua ngọt.', 'Crispy fried red tilapia fillets served with sweet and sour fish sauce.', 'レッドティラピアのフィレをカリッと揚げ、甘酸っぱいヌクマムソースを添えて。', 40000, 'vietnamese', 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=800'],
    ['m6', 'Sườn om dưa cải', 'Braised ribs with pickled greens', '豚スペアリブと高菜の煮込み', 'Sườn non mềm om cùng dưa cải chua thanh mát.', 'Tender ribs braised with refreshing pickled mustard greens.', 'さっぱりとした高菜と煮込んだ柔らかいスペアリブ。', 40000, 'vietnamese', 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800'],
    ['m7', 'Bắp giò luộc', 'Boiled pork shank', '豚すね肉のボイル', 'Thịt bắp giò luộc thái mỏng, giòn giòn dai dai.', 'Thinly sliced boiled pork shank, crunchy and chewy.', '薄切りにした豚すね肉のボイル。コリコリとした食感。', 40000, 'vietnamese', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'],
    ['m8', 'Ba chỉ rang cháy cạnh', 'Caramelized pork belly', '豚バラ肉の焦がし炒め', 'Thịt ba chỉ rang cháy cạnh đậm đà, đưa cơm.', 'Savory caramelized pork belly, perfect with rice.', 'ご飯が進む、香ばしく炒めた豚バラ肉。', 40000, 'vietnamese', 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=800']
  ];

  const insertMenu = db.prepare("INSERT INTO menu_items (id, name_vi, name_en, name_ja, desc_vi, desc_en, desc_ja, price, category, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  for (const item of initialMenu) {
    insertMenu.run(...item);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // API Routes
  app.get("/api/user/:id", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
    res.json(user);
  });

  app.get("/api/menu", (req, res) => {
    const items = db.prepare("SELECT * FROM menu_items WHERE available = 1").all();
    const formattedItems = items.map((item: any) => ({
      id: item.id,
      name: { vi: item.name_vi, en: item.name_en, ja: item.name_ja },
      description: { vi: item.desc_vi, en: item.desc_en, ja: item.desc_ja },
      price: item.price,
      category: item.category,
      image: item.image,
      available: !!item.available,
      tags: []
    }));
    res.json(formattedItems);
  });

  app.get("/api/orders/:userId", (req, res) => {
    const orders = db.prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC").all(req.params.userId);
    const formattedOrders = orders.map((o: any) => ({
      id: o.id,
      userId: o.user_id,
      userName: o.user_name,
      itemIds: JSON.parse(o.item_ids),
      itemNames: JSON.parse(o.item_names),
      orderDate: o.order_date,
      status: o.status,
      price: o.price,
      notes: {
        moreRice: !!o.more_rice,
        lessRice: !!o.less_rice,
        moreSoup: !!o.more_soup,
        moreChopsticks: !!o.more_chopsticks,
        moreChili: !!o.more_chili,
        customNote: o.custom_note
      }
    }));
    res.json(formattedOrders);
  });

  app.post("/api/orders", (req, res) => {
    const order = req.body;
    db.prepare(`
      INSERT INTO orders (id, user_id, user_name, item_ids, item_names, order_date, status, price, more_rice, less_rice, more_soup, more_chopsticks, more_chili, custom_note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      order.id, order.userId, order.userName, JSON.stringify(order.itemIds), JSON.stringify(order.itemNames),
      order.orderDate, order.status, order.price,
      order.notes.moreRice ? 1 : 0, order.notes.lessRice ? 1 : 0, order.notes.moreSoup ? 1 : 0,
      order.notes.moreChopsticks ? 1 : 0, order.notes.moreChili ? 1 : 0, order.notes.customNote
    );
    
    // Update user debt
    db.prepare("UPDATE users SET debt = debt + ? WHERE id = ?").run(order.price, order.userId);
    
    res.json({ success: true });
  });

  app.post("/api/menu", (req, res) => {
    const item = req.body;
    const id = `m-${Date.now()}`;
    db.prepare(`
      INSERT INTO menu_items (id, name_vi, name_en, name_ja, desc_vi, desc_en, desc_ja, price, category, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, item.name.vi, item.name.en, item.name.ja,
      item.description.vi, item.description.en, item.description.ja,
      40000, 'vietnamese', item.image
    );
    res.json({ success: true, id });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
