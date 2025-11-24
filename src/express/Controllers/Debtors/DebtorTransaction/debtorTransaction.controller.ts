import { DebtorTransaction } from "../../../Class/DebtorTransaction";
import { Response, Request } from "express";
import pool from "../../../Database/postgres";
import { Functions } from "../../../Class/Functions";

export const createDebtorTransaction = async (req: Request, res: Response) => {
    try {
        const {accountID, debtorID, categoryID, type, amount, details, location, supplierID, date, time, day, week, month, monthName, year} = req.body
        const debtorTransaction: DebtorTransaction = new DebtorTransaction({accountID, debtorID, categoryID, type, amount, details, location, supplierID, date, time, day, week, month, monthName, year })
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
        if(!accountID || !debtorID) throw new Error("No AccountID or DebtorID")
        const SQL:string = `
        SELECT
            debtor_transaction.account_id,
            debtor_transaction.id,
            debtor_transaction.amount,
            debtor_transaction.details,
            debtor_transaction.date,
            debtor_transaction.time,
            debtor_transaction.type,
            debtor_transaction.monthname,
            debtor_transaction.year,

            supplier.id AS "supplier_id",
            supplier.name AS "supplier_name",

            category.id AS "category_id",
            category.name AS "category_name"

        FROM
            debtor_transaction


        LEFT JOIN supplier on debtor_transaction.supplier_id = supplier.id
        LEFT JOIN category on debtor_transaction.category_id = category.id

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
            debtorID: debtorID,
            accountID: accountID,
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
        res.status(200).json({
            msg: 'Retrived Transaction by ID Successfully',
            debtorTransaction:  query.rows
        })

    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
}

export const updateDebtorTransaction = async (req: Request, res: Response) => {
    try {
        const {accountID, debtorTransactionID, supplierID, categoryID, details, amount, type, date, time } = req.body

        if(!accountID || !debtorTransactionID) return res.status(500).json({error: `Debtor TXN ID or Account ID missings`})

        const func = new Functions()
        const {day, week, month, monthName, year} = func.breakDownDate(date)
        const SQL: string = `UPDATE debtor_transaction SET supplier_id=$1, category_id=$2, details=$3, amount=$4, type=$5, date=$6, time=$7, day=$8, week=$9, month=$10, monthname=$11, year=$12 WHERE id=$13 AND account_id=$14`
        const values = [supplierID, categoryID, details, amount, type, date, time, day, week, month, monthName, year, debtorTransactionID, accountID]
        const query = await pool.query(SQL, values)
        if((query.rowCount || 0) === 0) throw new Error(`Could not update Debtor TXN.`)
        return res.status(200).json({msg: `DEBTOR TXN: ${debtorTransactionID} Updated`})
    } catch (error) {
        return res.status(500).json({error: `${error}`})
    }
}

export const deleteDebtorTransaction = async (req: Request, res: Response) => {
    try {
        const {accountID, debtorTransactionID} = req.body
        if(!accountID || !debtorTransactionID) return res.status(500).json({error: `Debtor TXN ID or Account ID missings`})
        const SQL:string = `DELETE FROM debtor_transaction WHERE id=$1 AND account_id=$2`
        const values = [debtorTransactionID, accountID]
        await pool.query(SQL, values)
        console.log(`DELETD DEBTOR TXN: ${debtorTransactionID}`)
        return res.status(200).json({message: `Delete Debtor TXN: ${debtorTransactionID}`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: `${error}`})
    }
}