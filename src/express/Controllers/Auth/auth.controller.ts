import { error } from "console";
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

        
        // Y This means that the Diamond_User already Existed
        if((query.rowCount ?? 0) > 0){
            const SQL_GET_USER_ACCOUNT_ID = `SELECT * FROM account WHERE diamond_user_id=$1`
            const values = [query.rows[0].id]
            console.log("----->", query.rows[0].id)
            const founudDiamondUser = await pool.query(SQL_GET_USER_ACCOUNT_ID, values)
            console.log("Found User AccountID [account table] 002", founudDiamondUser.rows)
            console.log("002.1", founudDiamondUser.rows[0])

             if((founudDiamondUser.rowCount  || 0) > 0){
                const SQL_GET_EXISTING_DIAMOND_USER_AUTH_DETAILS = `
                    SELECT
                        account.id AS "account_id",
                        account.name AS "account_name",
                        diamond_user.email,
                        diamond_user.id AS "diamond_user_id"
                    FROM account

                    INNER JOIN diamond_user ON account.diamond_user_id = diamond_user.id

                    WHERE diamond_user_id=$1
                `
                const values = [founudDiamondUser.rows[0].diamond_user_id]

                const existingDiamondUser = await pool.query(SQL_GET_EXISTING_DIAMOND_USER_AUTH_DETAILS, values)
                       
                return res.status(201).json({
                    authenticatedDiamondUser: {
                        accountID: existingDiamondUser.rows[0].account_id,
                        accountName: existingDiamondUser.rows[0].account_name,
                        diamondUserID: existingDiamondUser.rows[0].diamond_user_id,
                        diamondUserEmail: existingDiamondUser.rows[0].email
                    }, 
                    msg: `[Success]: Auth details of existing Diamond_User 003`
                })
                }

                else {
                    console.log("Could not get User, once the account was created000 3.1")
                    return res.status(500).json({error: "Could not get User, once the account was created000 3.2"})
                }
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
                        // Y This creates the Diamond Account
                        const SQL_CREATE_ACCOUNT: string =`INSERT INTO account (name, diamond_user_id) VALUES ($1, $2) RETURNING *`
                        const values = ["main", newDiamondUserCreatedID]
                        const createdAddedUserMainAccount = await pool.query(SQL_CREATE_ACCOUNT, values)
                        
                        if((createdAddedUserMainAccount.rowCount  || 0) > 0){
                            const SQL_GET_NEWLY_CREATED_AUTH_DETAILS = `
                                SELECT
                                    account.id AS "account_id",
                                    account.name AS "account_name",
                                    diamond_user.email,
                                    diamond_user.id AS "diamond_user_id"
                                FROM account

                                INNER JOIN diamond_user ON account.diamond_user_id = diamond_user.id

                                WHERE diamond_user_id=$1
                            `
                            const values = [createdAddedUserMainAccount.rows[0].diamond_user_id]

                            const receivedNewlyCreatedDiamondUser = await pool.query(SQL_GET_NEWLY_CREATED_AUTH_DETAILS, values)
                       
                            return res.status(201).json({
                                authenticatedDiamondUser: {
                                    accountID: receivedNewlyCreatedDiamondUser.rows[0].account_id,
                                    accountName: receivedNewlyCreatedDiamondUser.rows[0].account_name,
                                    diamondUserID: receivedNewlyCreatedDiamondUser.rows[0].diamond_user_id,
                                    diamondUserEmail: receivedNewlyCreatedDiamondUser.rows[0].email
                                }, 
                                msg: `[Success]: Newly Created Diamond User Details 005`
                            })
                        }
                        else {
                            console.log("Could not get User, once the account was created000 5.1")
                            return res.status(500).json({error: "Could not get User, once the account was created000 5.1"})
                        }

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