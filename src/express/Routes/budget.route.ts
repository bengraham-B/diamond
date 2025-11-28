import express from "express"
const router = express.Router()

import { createBudget, getBudget } from "../Controllers/Budget/Budget.controller"
import { budgetCreditTotal, budgetDebitTotal } from "../Controllers/Budget/BudgetTotals.controller"

router.post("/create_budget", createBudget)
router.post("/get_budget", getBudget)

//Y --------- Budget Totals ---------
router.post("/credit_budget_total", budgetCreditTotal)
router.post("/debit_budget_total", budgetDebitTotal)

export default router