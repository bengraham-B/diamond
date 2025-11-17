import { Debtor } from "../../../Class/Debtor";
import { Response, Request } from "express";
import pool from "../../../Database/postgres";

export const createDebtor = async (req: Request, res: Response) => {
    try {
        const {name, details, accountID} = req.body
        const debtor: Debtor = new Debtor({name: name, details: details, accountID: accountID})
        debtor.createDebtor()
        console.log("[Success]: Debtor Created")
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

export const deleteDebtor = async (req: Request, res: Response) => {
    try {
        const {debtorID, accountID} = req.body

        //Y Check if their are TXN for specific Debtor

        const SQL_DELETE_DEBTOR_CHECK_IF_THEIR_ARE_TEXN = `SELECT * FROM debtor_transaction WHERE debtor_id=$1 AND account_id=$2`
        const checkDebtorTXN = await pool.query(SQL_DELETE_DEBTOR_CHECK_IF_THEIR_ARE_TEXN, [debtorID, accountID])

        if((checkDebtorTXN.rowCount || 0) > 0){
            console.log("Debtor Has TXN which need to be Deleted")

            //Y Delete Debtpr Transactions
            const SQL_DELETE_DEBTOR_TXN: string = `DELETE FROM debtor_transaction WHERE debtor_id=$1 AND account_id=$2`
            const VALUES_SQL_DELETE_DEBTOR_TXN = [debtorID, accountID]
            const queryDeleteDebtorTXN = await pool.query(SQL_DELETE_DEBTOR_TXN, VALUES_SQL_DELETE_DEBTOR_TXN)

            if((queryDeleteDebtorTXN.rowCount || 0) > 0){
                //Y Delete Debtor 
                const SQL_DELETE_DEBTOR:string = `DELETE FROM debtor WHERE id=$1 AND account_id=$2`
                const VALUES_SQL_DELETE_DEBTOR = [debtorID, accountID]
                const queryDeleteDebtor = await pool.query(SQL_DELETE_DEBTOR, VALUES_SQL_DELETE_DEBTOR)
                return res.status(200).json({msg: `[Success]: Debtor and Debtor TXN deleted`})
            }

            else {
                throw new Error(`Could not Delete Debtor Or Transactions:`)
            }
        }
        
        else {
            console.log("Debtor Has not TXN")
            //Y Delete Debtor 
            const SQL_DELETE_DEBTOR:string = `DELETE FROM debtor WHERE id=$1 AND account_id=$2`
            const VALUES_SQL_DELETE_DEBTOR = [debtorID, accountID]
            const queryDeleteDebtor = await pool.query(SQL_DELETE_DEBTOR, VALUES_SQL_DELETE_DEBTOR)
            res.status(200).json({msg: `[Success]: Debtor Deleted`})
        }
    
   } catch (error) {
        return res.status(500).json({error: `Could not Delete Debtor or Transaction: ${error}`})
    
   }

}

export const updateDebtor = async (req: Request, res: Response) => {
    try {
        const {name, details, debtorID, accountID} = req.body
        console.log("Update Debtor")
        console.log({name, details, debtorID, accountID})
        const SQL_UPDATE_DEBTOR = `UPDATE debtor SET name=$1, details=$2 WHERE id=$3 AND account_id=$4`
        const valuesUpdateDebtor = [name, details, debtorID, accountID]
        const query = await pool.query(SQL_UPDATE_DEBTOR, valuesUpdateDebtor)

        if((query.rowCount || 0) > 0){
            return res.status(200).json({msg: `[Success]: Debtor Updated`})
        }
        else {
            res.status(500).json({error: `Could not updated debtor`})
        }
    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
}

export const getDebtors = async (req: Request, res: Response) => {
    try {
        const {accountID} = req.body
        const SQL:string = `SELECT * FROM debtor WHERE account_id=$1`
        const values =[accountID]
        const query = await pool.query(SQL, values)
        return res.status(200).json({debtors: query.rows})
        
    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
}















