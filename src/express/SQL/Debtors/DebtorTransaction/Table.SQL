CREATE TABLE IF NOT EXISTS debtor_transaction(
    id UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id TEXT,
    debtor_id TEXT,
    ategory_id TEXT,
    
    type TEXT,
    amount DOUBLE,
    details TEXT,
    location TEXT,
    supplier TEXT,

    date TEXT,
    day INT,
    week INT,
    month INT,
    monthName TEXT,
    year INT
)