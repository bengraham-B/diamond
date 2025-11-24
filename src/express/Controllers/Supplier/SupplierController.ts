import { Response, Request } from "express";
import pool from "../../Database/postgres";


export const getUserSuppliers = async (req: Request, res: Response) => {
    try {
        const {accountID} = req.body
        const SQL = `SELECT * FROM supplier WHERE account_id=$1 ORDER BY name ASC`
        const values: string[] = [accountID]
        return res.status(200).json({suppliers: (await pool.query(SQL, values)).rows})
    } catch (error) {
        res.status(500).json({error: error})
    }
}