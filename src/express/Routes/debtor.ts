import express from "express"
const router = express.Router()

// Importing Controllers
import { createDebtor } from "../Controllers/Debtors/Debtor/debtorController"
import { getDebtors } from "../Controllers/Debtors/Debtor/debtorController"


router.post("/", createDebtor)
router.post("/get_debtors", getDebtors)
router

export default router
