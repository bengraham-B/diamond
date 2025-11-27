import express from "express"
const router = express.Router()

// Importing Controllers
import { getMonthTotalPerCategory, createCategory, deleteCategory, getUserCategories, updateCategory } from "../Controllers/Category/Category.controller"

router.post("/", createCategory)

router.post("/get_user_categories", getUserCategories)

router.post("/get_month_total_per_category", getMonthTotalPerCategory)

router.put("/", updateCategory)

router.delete("/", deleteCategory)


export default router