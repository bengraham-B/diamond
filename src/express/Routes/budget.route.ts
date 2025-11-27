import express from "express"
const router = express.Router()

import { createBudget } from "../Controllers/Budget/BudgetController"

router.post("/create_budget", createBudget)

export default router