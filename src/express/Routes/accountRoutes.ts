import express from "express"
const router = express.Router()

import { createAccount } from "../Controllers/Account/AccountController"

router.post("/", createAccount)

router

export default router