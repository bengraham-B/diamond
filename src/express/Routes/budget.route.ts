import express from "express"
const router = express.Router()

import { createBudget, getBudget } from "../Controllers/Budget/Budget.controller"
import { budgetCreditTotal, budgetDebitTotal } from "../Controllers/Budget/BudgetTotals.controller"
import { getBudgetDebitTable } from "../Controllers/Budget/BudgetDebitTable.controller"
import { getBudgetCreditTable } from "../Controllers/Budget/BudgetCreditTable.controller"

router.post("/create_budget", createBudget)
router.post("/get_budget", getBudget)

//Y --------- Budget Table ---------
router.post("/credit_budget_table", getBudgetCreditTable)
router.post("/debit_budget_table", getBudgetDebitTable)

//Y --------- Budget Totals ---------
router.post("/credit_budget_total", budgetCreditTotal)
router.post("/debit_budget_total", budgetDebitTotal)

export default router