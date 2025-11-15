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
        day,
        week,
        month,
        monthName,
        year 
    } = req.body

    // console.log(details)
    console.log(req.body)
    try {
        const transaction: Transaction = new Transaction({details: details, amount: amount, supplierID: supplierID, location: location, type: type, accountID: accountID, categoryID: categoryID, date: date, day: day, week: week, month: month, monthName: monthName, year: year})
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
        console.log(`Transaction Amount: ${query.rows.length}`)
        console.log(`Retrived Transactions by Account: ${accountID}`)

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
        await pool.query(SQL, values)
        console.log(`DELETD TXN: ${transactionID}`)
        res.status(200).json({message: `Delete TXN: ${transactionID}`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: `${error}`})
    }
}

export const editTransaction = async (req:Request, res: Response) => {
    try {
        const { accountID, transactionID, supplierID, categoryID, details, amount, type, date } = req.body
        console.log({accountID, transactionID})

        const func = new Functions()
        const {day, week, month, monthName, year} = func.breakDownDate(date)
        const SQL: string = `UPDATE transaction SET supplier_id=$1, category_id=$2, details=$3, amount=$4, type=$5, date=$6, day=$7, week=$8, month=$9, month_name=$10, year=$11 WHERE id=$12`
        const values = [supplierID, categoryID, details, amount, type, date, day, week, month, monthName, year, transactionID]
        await pool.query(SQL, values)
        console.log(`Txn: ${transactionID} Updated`)
        console.log(`Txn: ${categoryID} Category ID`)
        console.log(`Txn: ${transactionID} Transaction ID`)
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