CREATE TABLE IF NOT EXISTS account(
    id UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    details TEXT,
    time_stamp TIMESTAMPTZ DEFAULT NOW()
)