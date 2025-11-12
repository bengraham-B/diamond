import express from "express"
const router = express.Router()

// Importing Controllers
import { createDebtorTransaction, getDebtorTransactionByID,getDebtorTransactionByMonth } from "../Controllers/Debtors/DebtorTransaction/debtorTransaction.controller"
// import { getDebtorTransactionByMonth } from "../Controllers/Debtors/DebtorTransaction/debtorTransaction"

router.post("/", createDebtorTransaction)
router.post("/getDebtorTransactions", getDebtorTransactionByMonth)
router.post("/getDebtorTransactionByID", getDebtorTransactionByID)


export default router