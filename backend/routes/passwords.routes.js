import express from "express"
import { handleCreatePassword, handleDeletePassword, handleGetAllPasswords, handleUpdatePassword } from "../controllers/passwords.controller.js";


let router = express.Router()


router.get("/", handleGetAllPasswords) // get all passwords
router.post("/", handleCreatePassword) // create a new password
router.delete("/:id", handleDeletePassword) // delete a password
router.put("/:id", handleUpdatePassword) // update a password



export default router 