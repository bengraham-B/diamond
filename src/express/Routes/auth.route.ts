import express from "express"
import { diamondUserAuth, diamondUserAuthProvider } from "../Controllers/Auth/auth.controller"
const router = express.Router()

router.post("/", diamondUserAuth)
router.post("/provider", diamondUserAuthProvider)


export default router