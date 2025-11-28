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
        console.log(`${error}`)
        res.status(500).json({error: `${error}`})
    }
}
