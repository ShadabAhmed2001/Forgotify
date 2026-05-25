import jwt from "jsonwebtoken"
import user from "../models/user.model.js"

let protect = async (req, res, next) => {
    try {

    }
    catch (err) {
        res.status(500).json({ Status: "failed", Message: err.message })
    }
}