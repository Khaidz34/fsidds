-- ═══════════════════════════════════════════════════════════
-- TEST USERS FOR FSI DDS
-- Run this in Supabase SQL Editor to create test accounts
-- ═══════════════════════════════════════════════════════════

-- Admin account (already exists in schema.sql)
-- Username: admin
-- Password: password

-- Test User 1 (Password: 123456)
INSERT INTO users (username, password, fullname, role)
VALUES (
  'nhanvien1',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Nguyễn Văn A',
  'user'
) ON CONFLICT (username) DO NOTHING;

-- Test User 2 (Password: 123456)
INSERT INTO users (username, password, fullname, role)
VALUES (
  'nhanvien2',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Trần Thị B',
  'user'
) ON CONFLICT (username) DO NOTHING;

-- Test User 3 (Password: 123456)
INSERT INTO users (username, password, fullname, role)
VALUES (
  'nhanvien3',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Lê Văn C',
  'user'
) ON CONFLICT (username) DO NOTHING;

-- Test User 4 (Password: 123456)
INSERT INTO users (username, password, fullname, role)
VALUES (
  'nhanvien4',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Phạm Thị D',
  'user'
) ON CONFLICT (username) DO NOTHING;

-- Test User 5 (Password: 123456)
INSERT INTO users (username, password, fullname, role)
VALUES (
  'nhanvien5',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Hoàng Văn E',
  'user'
) ON CONFLICT (username) DO NOTHING;

-- Verify
SELECT id, username, fullname, role, created_at 
FROM users 
ORDER BY created_at DESC;
