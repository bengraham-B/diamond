import express from "express"
const router = express.Router()

// Importing Controllers
import { balancePerDebtorAdnTxn, createCategory, deleteCategory, getUserCategories, updateCategory } from "../Controllers/Category/Category.controller"

router.post("/", createCategory)

router.post("/get_user_categories", getUserCategories)

router.post("/balance_per_debtor_&_txn", balancePerDebtorAdnTxn)

router.put("/", updateCategory)

router.delete("/", deleteCategory)


export default router