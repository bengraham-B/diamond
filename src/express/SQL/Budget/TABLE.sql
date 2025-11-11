CREATE TABLE budget (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID,
  category_id UUID,
  amount FLoat,
  time_stamp TIMESTAMPTZ DEFAULT NOW()
);