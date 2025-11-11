import express from "express"
const router = express.Router()

import { createBudget, getUserWeekBudgets } from "../Controllers/Budget/BudgetController"

router.post("/create_budget", createBudget)

router.post("/get_user_week_budgets", getUserWeekBudgets)

export default router