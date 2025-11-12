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

export const getOutstandingBalancePerDebtor = async (req: Request, res: Response) => {
    try {
        const {accountID} = req.body
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

export const getDebtorDetails = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}