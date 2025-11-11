import { Budget } from "../../Class/Budget";
import { Response, Request } from "express"
import pool from "../../Database/postgres";

export const createBudget = async (req:Request, res: Response) => {
    console.log("Create Budget")
    try {
        const {accountID, amount, details, categoryID, type, tableName, period} = req.body
        const budget = new Budget({accountID: accountID, details: details, amount: amount, categoryID: categoryID, type:type, tableName: tableName, period: period})
        const id = await budget.createBudget()
        res.status(200).json(
            {
                msg: "Budget Created Successfully",
                id: id
            }
        )
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({error: `${error}`})
    }
}

export const getUserWeekBudgets = async (req:Request, res: Response) => {
    try {
        const {accountID} = await req.body
        const SQL:string = `
            SELECT
                SUM(transaction.amount) AS money_spent,
                transaction.category_id,
                transaction.week,
                transaction.account_id,

                budget.amount,
                budget.details,
                budget.budget_period,
                budget.type,

            CASE
                WHEN SUM(transaction.amount) > budget.amount THEN 'OVER'
                ELSE 'GOOD'
            END AS "budget_inidcator",
                ROUND((SUM(transaction.amount::numeric) / budget.amount::numeric) * 100, 2) AS percent_of_budget,
                (budget.amount - SUM(transaction.amount)) AS diif
            
                FROM
                transaction

            RIGHT JOIN budget ON
                transaction.category_id = budget.category_id

            WHERE
                budget.budget_period = 'week' AND
                transaction.account_id=$1

            GROUP BY 
                transaction.week, 
                transaction.category_id, 
                transaction.account_id,
                budget.details, 
                budget.type, 
                budget.amount, 
                budget.budget_period
                
            ORDER BY 
                budget.details ASC, 
                transaction.week ASC;
        `
        const values = [accountID]

        return res.status(200).json(
            {
                budgets: (await pool.query(SQL,values)).rows
            }
        )
    } catch (error) {
        
    }

}