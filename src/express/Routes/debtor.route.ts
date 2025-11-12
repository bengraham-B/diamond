import express from "express"
const router = express.Router()

// Importing Controllers
import { createDebtor, getDebtorDetails, getOutstandingBalancePerDebtor } from "../Controllers/Debtors/Debtor/debtor.controller.js"

router.post("/", createDebtor)
router.post("/get_balance_per_outstanding_debtor", getOutstandingBalancePerDebtor)
router.post("/get_debtor_details", getDebtorDetails)

export default router
