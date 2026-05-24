import express from "express"
import { handleUserLogin, handleUserRegistration } from "../controllers/auth.controller.js"

let router = express.Router()

router.post("/register", handleUserRegistration)
router.post("/login", handleUserLogin)


export default router