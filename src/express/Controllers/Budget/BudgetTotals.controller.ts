import pool from "../../Database/postgres";
import { Response, Request } from "express"


export const budgetCreditTotal = async (req:Request, res: Response) => {
    try {
        const {accountID, month} = req.body

        const SQL_PrevoiusMonth: string = 
        `
        SELECT
            (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$2) AS previous_credit_budget,
            SUM(CASE WHEN transaction.month=$1 AND transaction.type='credit'THEN transaction.amount ELSE 0 END) AS previous_credit_actual,

            (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$2) - SUM(CASE WHEN transaction.month=$1 AND transaction.type='credit' THEN transaction.amount ELSE 0 END) AS previous_credit_diff
        FROM transaction
        RIGHT JOIN budget ON transaction.category_id = budget.category_id

        WHERE
            transaction.account_id=$2;
        `
        const query_prevoiusMonth_CREDIT = await pool.query(SQL_PrevoiusMonth, [(month - 1), accountID])

        
        const SQL_CurrentMonth: string = 
        `
        SELECT
            (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$2) AS current_credit_budget,
            SUM(CASE WHEN transaction.month=$1 AND transaction.type='credit'THEN transaction.amount ELSE 0 END) AS current_credit_actual,

            (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$2) - SUM(CASE WHEN transaction.month=$1 AND transaction.type='credit' THEN transaction.amount ELSE 0 END) AS current_credit_diff
        FROM transaction
        RIGHT JOIN budget ON transaction.category_id = budget.category_id

        WHERE
            transaction.account_id=$2;
        `

        const query_currentMonth_CREDIT = await pool.query(SQL_CurrentMonth, [month, accountID])

        res.status(200).json({
            prevoiousMonth_CREDIT: query_prevoiusMonth_CREDIT.rows,
            currentMonth_CREDIT: query_currentMonth_CREDIT.rows
        })
        
    } catch (error) {
        console.error({error})
        res.status(500).json({error})
    }
}

export const budgetDebitTotal = async (req:Request, res: Response) => {
    try {
        const {accountID, month} = req.body
        const SQL_PrevoiusMonth: string = 
        `
        SELECT
            (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$2) AS previous_debit_budget,
            SUM(CASE WHEN transaction.month=$1 AND transaction.type='debit'THEN transaction.amount ELSE 0 END) AS previous_debit_actual,

            (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$2) - SUM(CASE WHEN transaction.month=$1 AND transaction.type='debit' THEN transaction.amount ELSE 0 END) AS previous_debit_diff
        FROM transaction
        RIGHT JOIN budget ON transaction.category_id = budget.category_id

        WHERE
            transaction.account_id=$2;
        `
        const query_prevoiusMonth = await pool.query(SQL_PrevoiusMonth, [(month - 1), accountID])
        
        const SQL_CurrentMonth: string = 
        `
        SELECT
            (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$2) AS current_debit_budget,
            SUM(CASE WHEN transaction.month=$1 AND transaction.type='debit' THEN transaction.amount ELSE 0 END) AS current_debit_actual,

            (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$2) - SUM(CASE WHEN transaction.month=$1 AND transaction.type='debit' THEN transaction.amount ELSE 0 END) AS current_debit_diff
        FROM transaction
        RIGHT JOIN budget ON transaction.category_id = budget.category_id

        WHERE
            transaction.account_id=$2;
        `
        const query_currentMonth = await pool.query(SQL_CurrentMonth, [month, accountID])


        res.status(200).json({
            prevoiousMonth_DEBIT: query_prevoiusMonth.rows,
            currentMonth_DEBIT: query_currentMonth.rows
        })
        
    } catch (error) {
        res.status(500).json()
    }
}