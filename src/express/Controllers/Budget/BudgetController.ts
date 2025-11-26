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

export const getBudgets = async (req:Request, res: Response) => {
    try {
        const { accountID } = req.body

        const SQL:string = `
            SELECT
                category.id,
                category.name,
                category.type AS cat_type,
                SUM(CASE WHEN transaction.month_name = 'Jan' THEN transaction.amount ELSE 0 END) AS jan,
                SUM(CASE WHEN transaction.month_name = 'Feb' THEN transaction.amount ELSE 0 END) AS feb,
                SUM(CASE WHEN transaction.month_name = 'Mar' THEN transaction.amount ELSE 0 END) AS mar,
                SUM(CASE WHEN transaction.month_name = 'Apr' THEN transaction.amount ELSE 0 END) AS apr,
                SUM(CASE WHEN transaction.month_name = 'May' THEN transaction.amount ELSE 0 END) AS may,
                SUM(CASE WHEN transaction.month_name = 'Jun' THEN transaction.amount ELSE 0 END) AS jun,
                SUM(CASE WHEN transaction.month_name = 'Jul' THEN transaction.amount ELSE 0 END) AS jul,
                SUM(CASE WHEN transaction.month_name = 'Aug' THEN transaction.amount ELSE 0 END) AS aug,
                SUM(CASE WHEN transaction.month_name = 'Sept' THEN transaction.amount ELSE 0 END) AS sept,
                SUM(CASE WHEN transaction.month_name = 'Oct'  THEN transaction.amount ELSE 0 END) AS oct,
                SUM(CASE WHEN transaction.month_name = 'Nov' THEN transaction.amount ELSE 0 END) AS nov,
                SUM(CASE WHEN transaction.month_name = 'Dec' THEN transaction.amount ELSE 0 END) AS dec,
                AVG(transaction.amount) AS AVG_PER_TXN,
                COUNT(transaction.amount) AS Count,
                SUM(transaction.amount) AS total

            FROM 
                transaction

            LEFT JOIN category On transaction.category_id = category.id
        
            WHERE 
                transaction.account_id=$1
            GROUP BY 
                category_id, 
                category.name, 
                transaction.year,
                category.id,
                category.type

            ORDER BY 
                category.name        
        `
        const values = [accountID]
        const query = await pool.query(SQL, values)
        if((query.rowCount || 0) === 0) throw new Error("Could not get Budgets")

        res.status(200).json({budget: query.rows})
    } catch (error) {
        res.status(500).json({error: `${error}`})
        
    }
}