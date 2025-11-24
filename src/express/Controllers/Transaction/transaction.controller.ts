//^ Importing Class
import { Transaction } from "../../Class/Transaction"
import pool from "../../Database/postgres"
import { Response, Request } from "express"
import { Functions } from "../../Class/Functions"

export const createTransaction = async (req: Request, res: Response) => {
    const {
        details,
        amount,
        supplierID,
        location,
        type,
        accountID,
        categoryID,
        date,
        time,
        day,
        week,
        month,
        monthName,
        year 
    } = req.body

    try {
        const transaction: Transaction = new Transaction({details: details, amount: amount, supplierID: supplierID, location: location, type: type, accountID: accountID, categoryID: categoryID, date: date, time: time, day: day, week: week, month: month, monthName: monthName, year: year})
        const {id, returnWeek } = await transaction.createTransaction()
        res.status(200).json(
            {
                msg: `Transaction Added: ${id}`,
                details: `${details}`,
                week: `Week: ${returnWeek}`
            }
        )
    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
}

export const getTransactions = async (req: Request, res: Response) => {
    const { accountID } = req.body
    try {
        const SQL: string = 
        `
            SELECT
                transaction.id,
                transaction.amount,
                transaction.details,
                transaction.type,
                transaction.date,
                transaction.time,
                transaction.day,
                transaction.week,
                transaction.month,
                transaction.month_name,
                transaction.year,
                transaction.account_id,

                category.id AS category_id,
                category.name AS category_name,

                supplier.id AS supplier_id,
                supplier.name AS supplier_name

            FROM 
                transaction

            LEFT JOIN category on transaction.category_id = category.id
            LEFT JOIN supplier on transaction.supplier_id = supplier.id
            WHERE
                transaction.account_id = $1

            ORDER BY
                transaction.date DESC
        `
        const values: (string | number)[] = [accountID]
        const query = await pool.query(SQL, values)
        if((query.rowCount || 0) === 0) throw new Error(`Could not execute SQL Get TXN Controller`)
        res.status(200).json(
            {
                txn: query.rows,
            }
        )
    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
}

export const deleteTransaction = async (req:Request, res: Response) => {
    console.log("DELETE TXN")
    try {
        const {accountID, transactionID} = req.body
        console.log({accountID, transactionID})
        const SQL: string = `DELETE FROM transaction WHERE account_id=$1 AND id=$2`
        const values = [accountID, transactionID]
        const query = await pool.query(SQL, values)
        if((query.rowCount || 0) === 0) throw new Error(`Could not execute SQL Delete TXN Controller`)
        console.log(`DELETD TXN: ${transactionID}`)
        res.status(200).json({message: `Delete TXN: ${transactionID}`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: `${error}`})
    }
}

export const editTransaction = async (req:Request, res: Response) => {
    try {
        const { accountID, transactionID, supplierID, categoryID, details, amount, type, date, time } = req.body

        const func = new Functions()
        const {day, week, month, monthName, year} = func.breakDownDate(date)
        const SQL: string = `UPDATE transaction SET supplier_id=$1, category_id=$2, details=$3, amount=$4, type=$5, date=$6, time=$7, day=$8, week=$9, month=$10, month_name=$11, year=$12 WHERE id=$13 AND account_id=$14`
        const values = [supplierID, categoryID, details, amount, type, date, time, day, week, month, monthName, year, transactionID, accountID]
        const query = await pool.query(SQL, values)
        console.log(query.rowCount)
        if((query.rowCount || 0) === 0) throw new Error(`Could not execute SQL Edit TXN Controller`)
        return res.status(200).json({msg: `Txn: ${transactionID} Updated`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: `${error}`})
    }



}

export const expenseChart = async (req: Request, res: Response) => {
    try {
        const {accountID, month} = req.body
        const SQL:string = 
        `
            SELECT 
                SUM(amount) AS amount, 
                month, 
                day 
            FROM 
                transaction 
            WHERE 
                account_id=$1 AND 
                type='debit' AND 
                month=$2 
            GROUP BY 
                day, 
                month 
            ORDER BY 
                day ASC
        `
        const values = [accountID, month]
        return res.status(200).json({expenseChart: (await pool.query(SQL, values)).rows })
        
    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
}