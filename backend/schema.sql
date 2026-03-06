-- ================================================
-- FSI DDS - Supabase Database Schema
-- Chạy file này trong Supabase > SQL Editor
-- ================================================

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
  id         BIGSERIAL PRIMARY KEY,
  username   VARCHAR(50) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  fullname   VARCHAR(100) NOT NULL,
  role       VARCHAR(10) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MENUS
CREATE TABLE IF NOT EXISTS menus (
  id         BIGSERIAL PRIMARY KEY,
  date       DATE UNIQUE NOT NULL,
  image_url  TEXT,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DISHES (các món trong menu)
CREATE TABLE IF NOT EXISTS dishes (
  id         BIGSERIAL PRIMARY KEY,
  menu_id    BIGINT NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  name       VARCHAR(150) NOT NULL,
  sort_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ORDERS (mỗi đơn = 1 suất = 2 món = 40k)
CREATE TABLE IF NOT EXISTS orders (
  id          BIGSERIAL PRIMARY KEY,
  ordered_by  BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ordered_for BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dish1_id    BIGINT NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
  dish2_id    BIGINT NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
  price       INT NOT NULL DEFAULT 40000,
  date        DATE NOT NULL,
  month       VARCHAR(7) NOT NULL,  -- format: 2024-03
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PAYMENTS (thanh toán hàng tháng)
CREATE TABLE IF NOT EXISTS payments (
  id           BIGSERIAL PRIMARY KEY,
  user_id      BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month        VARCHAR(7) NOT NULL,  -- format: 2024-03
  paid_count   INT NOT NULL DEFAULT 0,
  paid_total   INT NOT NULL DEFAULT 0,
  paid_at      TIMESTAMPTZ DEFAULT NOW(),
  confirmed_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE(user_id, month)
);

-- 6. PAYMENT LOGS (lịch sử thanh toán để truy xuất ngược)
CREATE TABLE IF NOT EXISTS payment_logs (
  id           BIGSERIAL PRIMARY KEY,
  user_id      BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month        VARCHAR(7) NOT NULL,
  paid_count   INT NOT NULL,
  paid_total   INT NOT NULL,
  paid_at      TIMESTAMPTZ DEFAULT NOW(),
  confirmed_by BIGINT REFERENCES users(id) ON DELETE SET NULL
);

-- ─── Indexes (tăng tốc query) ─────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_date        ON orders(date);
CREATE INDEX IF NOT EXISTS idx_orders_month       ON orders(month);
CREATE INDEX IF NOT EXISTS idx_orders_ordered_for ON orders(ordered_for);
CREATE INDEX IF NOT EXISTS idx_orders_ordered_by  ON orders(ordered_by);
CREATE INDEX IF NOT EXISTS idx_menus_date         ON menus(date);
CREATE INDEX IF NOT EXISTS idx_dishes_menu_id     ON dishes(menu_id);
CREATE INDEX IF NOT EXISTS idx_payments_month     ON payments(month);
CREATE INDEX IF NOT EXISTS idx_payments_user_id   ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_month ON payment_logs(month);
CREATE INDEX IF NOT EXISTS idx_payment_logs_user  ON payment_logs(user_id);

-- ─── Row Level Security (tắt để dùng service key) ────────
ALTER TABLE users    DISABLE ROW LEVEL SECURITY;
ALTER TABLE menus    DISABLE ROW LEVEL SECURITY;
ALTER TABLE dishes   DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders   DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE payment_logs DISABLE ROW LEVEL SECURITY;

-- ─── Seed admin mặc định ─────────────────────────────────
-- Password: password (bcrypt hash)
INSERT INTO users (username, password, fullname, role)
VALUES (
  'admin',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Quản Trị Viên',
  'admin'
) ON CONFLICT (username) DO NOTHING;

-- ─── Xem dữ liệu ──────────────────────────────────────────
-- SELECT * FROM users;
-- SELECT * FROM menus;
-- SELECT * FROM orders;
