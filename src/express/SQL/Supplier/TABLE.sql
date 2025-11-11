CREATE TABLE IF NOT EXISTS supplier (
    id UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id TEXT,
    name TEXT,
    details TEXT,
    time_stamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

);