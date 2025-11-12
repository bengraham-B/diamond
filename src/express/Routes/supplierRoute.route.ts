import express from "express"
const router = express.Router()

import { getUserSuppliers } from "../Controllers/Supplier/SupplierController"

router.post("/get_user_suppliers", getUserSuppliers)

export default router