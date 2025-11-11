CREATE TABLE IF NOT EXISTS debtor(
    id UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    details TEXT,
    account_id UUID,
    time_stamp TIMESTAMP
)