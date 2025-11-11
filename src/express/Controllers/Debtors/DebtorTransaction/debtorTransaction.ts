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
        const debtorTransaction: DebtorTransaction = new DebtorTransaction({accountID: accountID, debtorID: debtorID, month: month})
        const debtorTxnByMonth = await debtorTransaction.getDebtorsByMonth({accountID: accountID, debtorID: debtorID, month: month})
        const monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        console.log(`${accountID}: Retrived Debtors Transaction for Month ${monthNames[month - 1]}`)
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

export const getOutstandingBalancePerDebtor = async (req: Request, res: Response) => {
    try {
        const {accountID, month} = req.body
        const SQL: string = `
            SELECT 
                debtor_id,
                debtor.name,
                debtor.details,
                SUM(
                    CASE
                        WHEN type='credit' THEN -amount
                        WHEN type='debit' THEN amount
                    END
                ) AS ob,

                SUM(
                    CASE
                        WHEN type='credit' THEN amount
                    END
                ) AS "credit_amount",

                SUM(
                    CASE
                        WHEN type='debit' THEN amount
                    END
                ) AS "debit_amount"

            FROM debtor_transaction

            INNER JOIN debtor ON debtor_transaction.debtor_id = debtor.id

            WHERE 
                debtor_transaction.account_id=$1

            GROUP BY 
                debtor_id, 
                debtor.name,
                debtor.details;
        `
        const SQL2: string = `
            SELECT
                SUM(
                    CASE
                        WHEN
                            type ='debit' THEN amount
                        END
                ) AS "total_debit_balance",

                SUM(
                    CASE
                        WHEN
                            type ='credit' THEN amount
                        END
                ) AS "total_credit_balance"

            FROM debtor_transaction

            WHERE 
                account_id=$1
        `
        const values = [accountID]

        return res.status(200).json({
            balance: (await pool.query(SQL, values)).rows,
            totalBalance: (await pool.query(SQL2, values)).rows
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error: `${error}`})
    }
}