SELECT
    SUM(CASE WHEN type='debit' THEN amount END) AS DEBIT_BALANCE,
    SUM(CASE WHEN type='credit' THEN amount END) AS CREDIT_BALANCE
FROM debtor_transaction;

SELECT
    SUM(CASE WHEN type='debit' THEN amount END) AS DEBIT_BALANCE,
    SUM(CASE WHEN type='credit' THEN amount END) AS CREDIT_BALANCE
FROM transaction;