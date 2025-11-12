import { DebtorTransaction } from "../../../Class/DebtorTransaction";
import { Response, Request } from "express";
import pool from "../../../Database/postgres";

export const createDebtorTransaction = async (req: Request, res: Response) => {
    try {
        const {accountID, debtorID, categoryID, type, amount, details, location, supplierID, date, day, week, month, monthName, year} = req.body
        const debtorTransaction: DebtorTransaction = new DebtorTransaction({accountID, debtorID, categoryID, type, amount, details, location, supplierID, date, day, week, month, monthName, year })
        const debtorTXN = await debtorTransaction.createDebtorsTransaction()
        res.status(200).json(
            {
                msg: `Added Debtor Transaction Successfully: ${debtorTXN}`,
                details: `${details}`
            })
    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
}

export const getDebtorTransactionByMonth = async (req: Request, res: Response) => {
    try {
        const {accountID, debtorID, month} = req.body
        // const SQL:string = `SELECT * FROM`
 
        res.status(200).json({
            msg: 'Retrived Transaction by month Successfully',
            debtorTransactions:  debtorTxnByMonth
        })
        
    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
}

export const getDebtorTransactionByID = async (req: Request, res: Response) => {
    try {
        const {debtorTxnID} = req.body
        const SQL: string = 'SELECT * FROM debtor_transaction WHERE id=$1'
        const values: string[] = [debtorTxnID]
        const query = await pool.query(SQL, values)
        // return query.rows
        res.status(200).json({
            msg: 'Retrived Transaction by ID Successfully',
            debtorTransaction:  query.rows
        })
        console.log(`${debtorTxnID}: Retrived Debtor Transaction `)

    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
}