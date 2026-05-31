import express from "express"
import { handleCreatePassword, handleDeletePassword, handleGetAllPasswords, handleUpdatePassword } from "../controllers/passwords.controller.js";
import protect from "../middlewares/auth.middleware.js";


let router = express.Router()

// always verify JWT for "api/passwords" route and this route must always send JWT in headers.
router.use(protect)

router.get("/", handleGetAllPasswords) // get all passwords
router.post("/", handleCreatePassword) // create a new password
router.delete("/:id", handleDeletePassword) // delete a password
router.put("/:id", handleUpdatePassword) // update a password



export default router 