import { Debtor } from "../../../Class/Debtor";
import { Response, Request } from "express";
import pool from "../../../Database/postgres";

export const createDebtor = async (req: Request, res: Response) => {
    try {
        const {name, details, accountID} = req.body
        const debtor: Debtor = new Debtor({name: name, details: details, accountID: accountID})
        debtor.createDebtor()
        res.status(200).json({msg: "Added Debtor Successfully"})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

export const getDebtors = async (req: Request, res: Response) => {
    try {
        const {accountID} = req.body
        const SQL:string = `SELECT * FROM debtor WHERE account_id=$1`
        const values = [accountID]
        const query = await pool.query(SQL, values)
        res.status(200).json({debtors: query.rows})
    } catch (error) {
        res.status(500).json({error: error})        
    }
}
