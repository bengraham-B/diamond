import express from "express"
const router = express.Router()

// Importing Controllers
import { createDebtorTransaction, getDebtorTransactionByID,getDebtorTransaction, updateDebtorTransaction, deleteDebtorTransaction } from "../Controllers/Debtors/DebtorTransaction/debtorTransaction.controller"
// import { getDebtorTransactionByMonth } from "../Controllers/Debtors/DebtorTransaction/debtorTransaction"

router.post("/", createDebtorTransaction)
router.post("/getDebtorTransactions", getDebtorTransaction)
router.post("/getDebtorTransactionByID", getDebtorTransactionByID)
router.put("/updateDebtorTransaction", updateDebtorTransaction)
router.delete("/delete_debtor_transaction", deleteDebtorTransaction)


export default router