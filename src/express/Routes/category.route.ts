import express from "express"
const router = express.Router()

// Importing Controllers
import { createCategory, getUserCategories } from "../Controllers/Category/CategoryController"

router.post("/", createCategory)

router.post("/get_user_categories", getUserCategories)

// router

export default router