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


            -- JAN
            budget.amount AS jan_budget,
            SUM(CASE WHEN txn.month='1' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS jan_actual,
            budget.amount - SUM(CASE WHEN txn.month='1' THEN txn.amount ELSE 0 END) AS jan_diff,
            
            -- FEB
            budget.amount AS feb_budget,
            SUM(CASE WHEN txn.month='2' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS feb_actual,
            budget.amount - SUM(CASE WHEN txn.month='2' THEN txn.amount ELSE 0 END) AS feb_diff,
            
            -- MARCH
            budget.amount AS mar_budget,
            SUM(CASE WHEN txn.month='3' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS mar_actual,
            budget.amount - SUM(CASE WHEN txn.month='3' THEN txn.amount ELSE 0 END) AS mar_diff,
            
            -- APRIL
            budget.amount AS apr_budget,
            SUM(CASE WHEN txn.month='4' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS apr_actual,
            budget.amount - SUM(CASE WHEN txn.month='4' THEN txn.amount ELSE 0 END) AS apr_diff,
            
            -- MAY
            budget.amount AS may_budget,
            SUM(CASE WHEN txn.month='5' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS may_actual,
            budget.amount - SUM(CASE WHEN txn.month='5' THEN txn.amount ELSE 0 END) AS may_diff,
            
            -- JUNE
            budget.amount AS jun_budget,
            SUM(CASE WHEN txn.month='6' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS jun_actual,
            budget.amount - SUM(CASE WHEN txn.month='6' THEN txn.amount ELSE 0 END) AS jun_diff,
            
            -- JULY
            budget.amount AS jul_budget,
            SUM(CASE WHEN txn.month='7' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS jul_actual,
            budget.amount - SUM(CASE WHEN txn.month='7' THEN txn.amount ELSE 0 END) AS jul_diff,
            
            -- AUG
            budget.amount AS aug_budget,
            SUM(CASE WHEN txn.month='8' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS aug_actual,
            budget.amount - SUM(CASE WHEN txn.month='8' THEN txn.amount ELSE 0 END) AS aug_diff,
            
            -- SEPT
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
            budget.amount - SUM(CASE WHEN txn.month='12' THEN txn.amount ELSE 0 END) AS dec_diff,

            -- TOTAL
            (budget.amount * 12) AS budget_year_total,
            SUM(txn.amount) AS actual_year_total,
            (budget.amount * 12) - SUM(txn.amount) AS diff_year_total

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