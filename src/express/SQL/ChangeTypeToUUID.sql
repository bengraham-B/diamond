ALTER TABLE transaction
ALTER COLUMN category_id TYPE uuid
USING category_id::uuid;