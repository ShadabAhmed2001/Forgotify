import bcrypt from "bcryptjs";
import user from "../models/user.model.js"
import jwt from "jsonwebtoken"

/**
 * This function generates json web tokens
 */
let generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })

/**
 * This function handles user registration
 */
let handleUserRegistration = async (req, res) => {
    try {
        let { name, email, password } = req.body // payload sent from client

        if (!name || !email || !password) {
            res.status(400).json({
                Status: "failed",
                Message: "All fields are required"
            })
            return
        }

        // check if email already exists in the database
        let isDuplicateEmail = await user.findOne({ email })
        if (isDuplicateEmail) {
            res.status(400).json({
                Status: "failed",
                Message: "Email already registered"
            })
            return
        }

        // hash the password before making an entry.
        let hashedPassword = await bcrypt.hash(password, 10) // (10 salt rounds is the standard)

        // create new user entry
        let result = await user.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            Status: "success",
            _id: result._id,
            name: result.name,
            email: result.email,
            token: generateToken(result._id), // create a jwt token when ever user is registered
        })
    }
    catch (err) {
        res.status(500).json({
            Status: "failed",
            Messages: err.message
        })
    }
}


/**
 * This function handles user login
 */
let handleUserLogin = async (req, res) => {
    try {
        let { email, password } = req.body

        // check if the user is registered
        let userRegistered = await user.findOne({ email })

        if (userRegistered) {
            let isValidPassword = await bcrypt.compare(password, userRegistered.password)
            if (isValidPassword) {
                res.status(200).json({
                    Status: "succeess",
                    Message: "Welcome back to Forgotify",
                    _id: userRegistered._id,
                    name: userRegistered.name,
                    email: userRegistered.email,
                    token: generateToken(userRegistered._id), // create a jwt token when ever user is logged in
                })
                return
            }
        }

        res.status(401).json({
            Status: "failed",
            Message: "Forgotify forgot who you are. Try again."
        })
        return

    }
    catch (err) {
        res.status(500).json({
            Status: "failed",
            Messages: err.message
        })
    }
}


export { handleUserRegistration, handleUserLogin }