import express from "express"
const router = express.Router()

import { createBudget, getBudgets } from "../Controllers/Budget/BudgetController"

router.post("/create_budget", createBudget)

router.post("/get_budgets", getBudgets)

export default router