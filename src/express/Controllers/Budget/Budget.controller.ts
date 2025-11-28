import { Budget } from "../../Class/Budget";
import { Response, Request } from "express"
import pool from "../../Database/postgres";

export const createBudget = async (req:Request, res: Response) => {
    console.log("Create Budget")
    try {
        const {accountID, amount, details, categoryID, type} = req.body
        const SQL: string = `INSERT INTO budget ("account_id", "category_id", "details", "amount", "type") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values: (string | number)[] = [accountID, categoryID, details, amount, type]
        const query = await pool.query(SQL, values)
        if((query.rowCount || 0) === 0) throw new Error("Could not create Budget")
        res.status(200).json({msg: "Budget Created Successfully"})
    } catch (error) {
        console.error(`${error}`)
        res.status(500).json({error: `${error}`})
    }
}

export const getBudget = async (req:Request, res: Response) => {
    try {
        const {accountID, month} = req.body

        const SQL_PREVIOUS_MONTH:string = 
            `
            SELECT
                budget.id,
                transaction.month,
                budget.type AS budget_type,
                category.name AS category_name,
                budget.amount AS budget,
                SUM(transaction.amount) AS actual,
                budget.amount- SUM(transaction.amount) AS diff

            FROM
                category

            RIGHT JOIN budget on category.id = budget.category_id
            RIGHT JOIN transaction ON category.id = transaction.category_id

            WHERE
                transaction.month=$1
                AND budget.account_id=$2

            GROUP BY
                category.name,
                budget.amount,
                budget.type,
                transaction.month,
                budget.id

            ORDER BY
                budget.type;
            `
        const VALUES_PREVIOUS_MONTH = [(month - 1), accountID]
        const QUERY_PREVIOUS_MONTH = await pool.query(SQL_PREVIOUS_MONTH, VALUES_PREVIOUS_MONTH)
        if((QUERY_PREVIOUS_MONTH.rowCount || 0) === 0) throw new Error(`Could not get Previous mont's budget records`)
       
            const SQL_CURRENT_MONTH:string = 
            `
            SELECT
                budget.id,
                transaction.month,
                budget.type AS budget_type,
                category.name AS category_name,
                budget.amount AS budget,
                SUM(transaction.amount) AS actual,
                budget.amount- SUM(transaction.amount) AS diff

            FROM
                category

            RIGHT JOIN budget on category.id = budget.category_id
            RIGHT JOIN transaction ON category.id = transaction.category_id

            WHERE
                transaction.month=$1
                AND budget.account_id=$2

            GROUP BY
                category.name,
                budget.amount,
                budget.type,
                transaction.month,
                budget.id

            ORDER BY
                budget.type;
            `
        const VALUES_CURRENT_MONTH = [month, accountID]
        const QUERY_CURRENT_MONTH = await pool.query(SQL_CURRENT_MONTH, VALUES_CURRENT_MONTH)
        if((QUERY_CURRENT_MONTH.rowCount || 0) === 0) throw new Error(`Could not get Current mont's budget records`)

        
       

        res.status(200).json({
            previous_month: QUERY_PREVIOUS_MONTH.rows,
            current_month: QUERY_CURRENT_MONTH.rows,
        })
    } catch (error) {
        console.error(`${error}`)
        res.status(500).json({error: `${error}`})
    }
}
