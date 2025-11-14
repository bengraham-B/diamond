CREATE TABLE diamond_user (
    id UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    password_hash TEXT,
    time_stamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
