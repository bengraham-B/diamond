import express from "express"
const router = express.Router()

// Importing Controllers
import { createTransaction, deleteTransaction, editTransaction, expenseChart } from "../Controllers/Transaction/transactionControllers"
import { getTransactions } from "../Controllers/Transaction/transactionControllers"

router.post("/", createTransaction)

router.post("/get_transactions", getTransactions)

router.delete("/delete", deleteTransaction)

router.put("/edit", editTransaction)

router.post("/expense_chart", expenseChart)

export default router