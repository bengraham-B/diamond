SELECT
    SUM(CASE WHEN type='debit' THEN amount END) AS DEBIT_BALANCE,
    SUM(CASE WHEN type='credit' THEN amount END) AS CREDIT_BALANCE
FROM debtor_transaction WHERE debtor_id='ccec5fce-c62a-4686-8672-62e5d65e00ce';

SELECT
    SUM(CASE
            WHEN type = 'credit' THEN -amount
            WHEN type = 'debit'  THEN amount
            ELSE 0
        END) AS outstanding_balance
FROM debtor_transaction;
SELECT
    SUM(CASE
            WHEN type = 'credit' THEN -amount
            WHEN type = 'debit'  THEN amount
            ELSE 0
        END) AS outstanding_balance
FROM debtor_transaction
WHERE debtor_id='ccec5fce-c62a-4686-8672-62e5d65e00ce';

SELECT * FROM debtor_transaction WHERE debtor_id='ccec5fce-c62a-4686-8672-62e5d65e00ce';

SELECT
    SUM(CASE
            WHEN type = 'credit' THEN -amount
            WHEN type = 'debit'  THEN amount
            ELSE 0
        END) AS outstanding_balance
FROM debtor_transaction
WHERE debtor_id='022c8713-ee9b-4399-b1b7-9c615ae584ad';

SELECT
    SUM(CASE WHEN type='debit' THEN amount END) AS DEBIT_BALANCE,
    SUM(CASE WHEN type='credit' THEN amount END) AS CREDIT_BALANCE
FROM transaction;

SELECT SUM(amount) FROM debtor_transaction WHERE debtor_id='ccec5fce-c62a-4686-8672-62e5d65e00ce';
SELECT SUM (amount)FROM transaction WHERE type='debit' AND month='8';
SELECT SUM (amount)FROM transaction WHERE type='credit' AND month='8';

INSERT INTO supplier (account_id, name, location, town) VALUES
('ced66b1b-be88-4163-8ba1-77207ec20ca9', 'Country Clinic', 'Old Stellenbosch Road', 'Somerset West');
