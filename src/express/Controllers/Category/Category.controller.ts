import { Category } from "../../Class/Category";
import { Response, Request } from "express";
import pool from "../../Database/postgres";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const {name, details, accountID} = req.body
        const category: Category = new Category({name: name, details: details, accountID: accountID})
        category.createCategory()
        res.status(200).json({msg: "Created Category Successfully"})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

export const getUserCategories = async (req: Request, res: Response) => {
    try{
        const  {accountID } = req.body
        const SQL:string = `SELECT * FROM category WHERE account_id=$1 ORDER BY name ASC`
        const values: string[] = [accountID]
        return res.status(200).json({categories: (await pool.query(SQL, values)).rows})
    } catch(error){
        res.status(500).json({error: error})
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const {name, details, accountID, categoryID} = req.body
        const SQL:string = `UPDATE category SET name=$1, details=$2 WHERE id=$3 AND account_id=$4`
        const values = [name, details, categoryID, accountID]
        const query = await pool.query(SQL,values)
        if((query.rowCount || 0 ) === 0) return res.status(500).json({msg: `Could not update Category`})
        return res.status(200).json({msg: `Category Update Successfully`})
        
    } catch (error) {
        console.error(`Could not update Category: ${error}`)
        res.status(500).json({error: error})
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {

        //TODO: Remove category from TXN which have it as their categoryID

        const {categoryID, accountID} = req.body
        const SQL:string = `DELETE FROM category WHERE id=$1 AND account_id=$2`
        const query = await pool.query(SQL,[categoryID, accountID])
        if((query.rowCount || 0 ) === 0) return res.status(500).json({msg: `Could not delete Category`})
        return res.status(200).json({msg: `Category Update Successfully`})
        
    } catch (error) {
        console.error(`Could not update Category: ${error}`)
        res.status(500).json({error: error})
    }
}

export const balancePerDebtorAdnTxn =  async (req: Request, res: Response) => {
    try {
        const {accountID} = req.body
        const SQL: string = `
            SELECT
                c.id,
                c.name,
                t.txn,
                d.debtor_txn
            FROM category c

            -- Aggregate normal transactions first
            LEFT JOIN (
                SELECT
                    category_id,
                    SUM(
                        CASE
                            WHEN type = 'debit'  THEN -amount
                            WHEN type = 'credit' THEN  amount
                        END
                    ) AS txn
                FROM transaction
                GROUP BY category_id
            ) t ON t.category_id = c.id

            -- Aggregate debtor transactions separately
            LEFT JOIN (
                SELECT
                    category_id,
                    SUM(
                        CASE
                            WHEN type = 'debit'  THEN  amount
                            WHEN type = 'credit' THEN -amount
                        END
                    ) AS debtor_txn
                FROM debtor_transaction
                GROUP BY category_id
            ) d ON d.category_id = c.id

            WHERE c.account_id = $1
            ORDER BY c.name;
    `
    const values =[accountID]
    const query = await pool.query(SQL, values)
    if((query.rowCount || 0) === 0) throw new Error("Could not Get Category Balance Per Debtor & TXN Category")
    res.status(200).json({balances: query.rows})
        
    } catch (error) {
        console.error(`Could not Get Category Balance Per Debtor & TXN Category: ${error}`)
        res.status(500).json({error: error})
    }

}

