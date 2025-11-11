import { Account } from "../../Class/Account";
import { Response, Request } from "express"

export const createAccount = async(req:Request, res: Response) => {
    const {name, details} = req.body

     try {
            const account: Account = new Account({name: name, details: details})
            account.createAccount()
            res.status(200).json(
                {
                    msg: "Create Account Successfully",

                }
            )
        } catch (error) {
            res.status(500).json({error: error})
        }
}