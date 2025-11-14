import express from "express"
import { diamondUserAuth } from "../Controllers/Auth/auth.controller"
const router = express.Router()

router.post("/", diamondUserAuth)


export default router