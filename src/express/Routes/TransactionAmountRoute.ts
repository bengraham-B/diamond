import express from "express"
import { getTransactionOverAmount } from "../Controllers/Balance/TransactionAmountController"
import { getTransactionUnderAmount } from "../Controllers/Balance/TransactionAmountController"
const router = express.Router()



router.post("/transaction_over_amount", getTransactionOverAmount)

router.post("/transaction_under_amount", getTransactionUnderAmount)

export default router