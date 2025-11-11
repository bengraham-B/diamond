import { Balance } from "../../Class/TransactionAmount";
import { Response, Request } from "express"

export const getTransactionOverAmount = async (req: Request, res: Response) => {
    
    const { userAmount, accountID } = req.body    
    try {
        console.log(req.body)
        const balance = new Balance({accountID: accountID, userAmount: userAmount})

        res.status(200).json({
            txn: (await balance.getTransactionOverAmount()).rows
        })
        
    } catch (error) {
        res.status(500).json({error: error})

    }
}

export const getTransactionUnderAmount = async (req: Request, res: Response) => {
    
    const { userAmount, accountID } = req.body    
    try {
        console.log(req.body)
        const balance = new Balance({accountID: accountID, userAmount: userAmount})

        res.status(200).json({
            txn: (await balance.getTransactionUnderAmount()).rows
        })
        
    } catch (error) {
        res.status(500).json({error: `${error}`})

    }
}