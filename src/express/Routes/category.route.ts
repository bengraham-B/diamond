import express from "express"
const router = express.Router()

// Importing Controllers
import { createCategory, deleteCategory, getUserCategories, updateCategory } from "../Controllers/Category/CategoryController"

router.post("/", createCategory)

router.post("/get_user_categories", getUserCategories)

router.put("/", updateCategory)

router.delete("/", deleteCategory)

export default router