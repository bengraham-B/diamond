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