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

export const getDebtorTransaction = async (req: Request, res: Response) => {
    try {
        const {accountID, debtorID} = req.body
        const SQL:string = `
        SELECT
            debtor_transaction.id,
            debtor_transaction.amount,
            debtor_transaction.details,
            debtor_transaction.date,
            debtor_transaction.type,
            debtor_transaction.monthname,
            debtor_transaction.year,

            supplier.id AS "supplier_id",
            supplier.name AS "supplier_name",

            category.id AS "category_id",
            category.name AS "category_name"

        FROM
            debtor_transaction


        INNER JOIN supplier on debtor_transaction.supplier_id = supplier.id
        INNER JOIN category on debtor_transaction.category_id = category.id

        WHERE
        debtor_transaction.account_id =$1 AND
        debtor_transaction.debtor_id =$2

        ORDER BY
            debtor_transaction.date DESC,
            debtor_transaction.amount DESC
    `
        const values = [accountID, debtorID]
        const query = await pool.query(SQL, values)
 
        return res.status(200).json({
            msg: 'Retrived Transaction by month Successfully',
            debtorTransactions:  query.rows
        })
        
    } catch (error) {
        console.log(error)
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

export const updateDebtorTransaction = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteDebtorTransaction = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}