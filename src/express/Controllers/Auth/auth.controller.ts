import pool from "../../Database/postgres"
import { Response, Request } from "express";

export const diamondUserAuth = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body
    console.log({firstName, lastName, email, password})

    try {
        const SQL_VERIFY_DIAMOND_USER: string = `SELECT * FROM diamond_user WHERE email=$1`
        const values = [email]
        const query = await pool.query(SQL_VERIFY_DIAMOND_USER, values)
        console.log({"Verify User 001": query.rows})

        
        // Y This means that there is a user
        if((query.rowCount ?? 0) > 0){
            const SQL_GET_USER_ACCOUNT_ID = `SELECT * FROM account WHERE diamond_user_id=$1`
            const values = [query.rows[0].id]
            console.log("----->", query.rows[0].id)
            const founudUserQuery = await pool.query(SQL_GET_USER_ACCOUNT_ID, values)
            console.log("Found User AccountID [account table] 002", founudUserQuery.rows)
            console.log("002.1", founudUserQuery.rows[0])

            return res.status(200).json({
                authenticatedDiamondUser: {
                    accountID: founudUserQuery.rows[0].id,
                    accountName: founudUserQuery.rows[0].name,
                    diamondUserID: founudUserQuery.rows[0].diamond_user_id,
                }, 
                msg: `User Exists Already 003`
            })

        } 
        
        // Y DIAMOND_USER does not exist so one will be created
        else {
            console.log({f:"USER DOES NOT EXIST 004"})

            //Y Add Diamond_User to DB (DIMAOND_USER table) 
            try {
                const SQL_ADD_DIAMOND_USER_TO_DB: string = `INSERT INTO diamond_user (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id`
                const values = [firstName, lastName, email, password]
                const diamondUserCreated = await pool.query(SQL_ADD_DIAMOND_USER_TO_DB, values)

                const newDiamondUserCreatedID = diamondUserCreated.rows[0].id
                console.log("---------")
                console.log({newDiamondUserCreatedID})

                if((diamondUserCreated.rowCount || 0) > 0){
                    try {
                        const SQL_CREATE_ACCOUNT: string =`INSERT INTO account (name, diamond_user_id) VALUES ($1, $2) RETURNING *`
                        const values = ["main", newDiamondUserCreatedID]
                        const createdAddedUserMainAccount = await pool.query(SQL_CREATE_ACCOUNT, values)
                        return res.status(201).json({
                            authenticatedDiamondUser: createdAddedUserMainAccount, 
                            msg: `User is Exists Already 005`
                        })
                    } catch (error) {
                        console.log("diamondUser.controller 006", error)
                        return res.status(500).json({error: error, msg: `Cannot make main Account`})
                        
                    }
                }

                return res.status(201).json({
                authenticatedDiamondUser: "diamondUserCreatedID.rows", 
                msg: `User is Exists Already 007`
            })

               
            } catch (error) {
                console.log("diamondUser.controller 008", error)
                return res.status(500).json({error: error, msg: `Cannot Add diamond_user to DB 009`})
            }          
        }
        
    } catch (error) {
        console.log("diamondUser.controller", error)
        return res.status(500).json({error: error, msg: `Cannot Verify diamond_user in DB 010`})
    }
}