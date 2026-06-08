import jwt from "jsonwebtoken"
import user from "../models/user.model.js"

let protect = async (req, res, next) => {
    try {

        // check is req header exists
        let authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                Status: "failed",
                Message: "Unauthorized access"
            })
            return
        }

        // if header exists, then extract and verify the token
        let jwtToken = authHeader.split(" ")[1]
        let decodeJWT = jwt.verify(jwtToken, process.env.JWT_SECRET) // returns an object

        // attach the user to req object
        req.user = await user.findById(decodeJWT.id).select({ Password: -1 })
        if (!req.user) {
            res.status(401).json({
                Status: "failed",
                Message: "User not found"
            })
            return
        }

        next() // calls the next controller based on the API call
    }
    catch (err) {
        console.log("failed")
        res.status(401).json({ Status: "failed", Message: "Token invalid or expired" })
    }
}

export default protect