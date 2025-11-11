import express from "express"
const router = express.Router()

// Importing Controllers
import { createDebtorTransaction, getDebtorTransactionByID,getDebtorTransactionByMonth, getOutstandingBalancePerDebtor } from "../Controllers/Debtors/DebtorTransaction/debtorTransaction"
// import { getDebtorTransactionByMonth } from "../Controllers/Debtors/DebtorTransaction/debtorTransaction"

router.post("/", createDebtorTransaction)
router.post("/getDebtorTransactions", getDebtorTransactionByMonth)
router.post("/getDebtorTransactionByID", getDebtorTransactionByID)
router.post("/get_balance_per_outstanding_debtor", getOutstandingBalancePerDebtor)

export default router