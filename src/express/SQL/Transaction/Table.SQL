CREATE TABLE IF NOT EXISTS transaction(
    id UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
    details TEXT,
    amount DOUBLE,
    supplier TEXT,
    location TEXT,
    type TEXT,
    account_id UUID,
    category_id UUID,
    date DATE,
    day INT,
    week INT,
    month INT,
    month_name TEXT,
    year INT,
    time_stamp TIMESTAMPTZ DEFAULT NOW()
)