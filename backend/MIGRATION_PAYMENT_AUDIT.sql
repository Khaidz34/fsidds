-- Run this in Supabase SQL Editor ONCE (for existing projects)
-- Adds snapshot fields + payment history logs for auditing

ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS paid_count INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS paid_total INT NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS payment_logs (
  id           BIGSERIAL PRIMARY KEY,
  user_id      BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month        VARCHAR(7) NOT NULL,
  paid_count   INT NOT NULL,
  paid_total   INT NOT NULL,
  paid_at      TIMESTAMPTZ DEFAULT NOW(),
  confirmed_by BIGINT REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_payment_logs_month ON payment_logs(month);
CREATE INDEX IF NOT EXISTS idx_payment_logs_user  ON payment_logs(user_id);

ALTER TABLE payment_logs DISABLE ROW LEVEL SECURITY;

