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
