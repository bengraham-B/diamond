CREATE TABLE IF NOT EXISTS category(
    id UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id TEXT,
    name TEXT,
    details TEXT
)