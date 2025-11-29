import { Budget } from "../../Class/Budget";
import { Response, Request } from "express"
import pool from "../../Database/postgres";

// Y This returns a table of debit budget for the year of each month
export const getBudgetCreditTable = async (req:Request, res: Response) => {
    try {
        const {accountID, year} = req.body
        const SQL: string = 
        `
        SELECT
            budget.id,
            category.name,
            category.type,
            -- Sept
            budget.amount AS sept_budget,
            SUM(CASE WHEN txn.month='9' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS sept_actual,
            budget.amount - SUM(CASE WHEN txn.month='9' THEN txn.amount ELSE 0 END) AS sept_diff,

            -- Oct
            budget.amount AS oct_budget,
            SUM(CASE WHEN txn.month='10' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS oct_actual,
            budget.amount - SUM(CASE WHEN txn.month='10' THEN txn.amount ELSE 0 END) AS oct_diff,

            -- NOV
            budget.amount AS nov_budget,
            SUM(CASE WHEN txn.month='11' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS nov_actual,
            budget.amount - SUM(CASE WHEN txn.month='11' THEN txn.amount ELSE 0 END) AS nov_diff,

            -- DEC
            budget.amount AS dec_budget,
            SUM(CASE WHEN txn.month='12' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS dec_actual,
            budget.amount - SUM(CASE WHEN txn.month='12' THEN txn.amount ELSE 0 END) AS dec_diff

        FROM
            transaction txn

        RIGHT JOIN budget ON txn.category_id = budget.category_id
        RIGHT JOIN category ON budget.category_id = category.id

        WHERE
            txn.account_id=$1
            AND budget.type='credit'
            AND txn.year =$2

        GROUP BY
            category.name,
            category.type, 
            budget.amount,
            budget.id

        ORDER BY
            category.type
        `;
        const values: (string | number)[] = [accountID, year]
        const query = await pool.query(SQL, values)

        if((query.rowCount || 0) === 0) throw new Error("Could not get Credit Table Budget")

        res.status(200).json({creditBudgetTable: query.rows})
    } catch (error) {
        console.error(`${error}`)
        res.status(500).json({error: `${error}`})
    }
}