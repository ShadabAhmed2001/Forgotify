import CrytpoJS from "crypto-js"
import user from "../models/user.model.js";

let crypto_secret = process.env.CRYPTO_SECRET

/**
 * This function returns the encrypted password
 */
let handlePasswordEncrypt = (pass) => {
    return CrytpoJS.AES.encrypt(pass, crypto_secret).toString()
}

/**
 * This function returns the decrypted password
 */
let handlePasswordDecrypt = (pass) => {
    return CrytpoJS.AES.decrypt(pass, crypto_secret).toString(CrytpoJS.enc.Utf8)
}

/**
 * This function gets all passwords for logged in user and decrypts them
 */
let handleGetAllPasswords = async (req, res) => {
    try {
        let passwords = await user.find({ _id: req.user._id }).sort({ createdAt: -1 }) // find and sort newest first

        // decrpyt the encrypted passwords before sending the response


    }
    catch (err) {

    }
}

/**
 * This function create a new password entry by encrypting it
 */
let handleCreatePassword = async (req, res) => {
    try {
        let { site, username = "", password, category = "other" } = req.body

        // check if site and password is sent in payload
        if (!site || !password) {
            res.status(400).json({
                Status: "failed",
                Message: "Site and password are required."
            })
            return
        }


        let newEntry = await user.create({
            user: req.user._id, // user is added to req in authMiddleware
            site,
            category,
            username,
            encryptedPassword: handlePasswordEncrypt(password)
        })
    }
    catch (err) {

    }
}


let handleDeletePassword = async (req, res) => {
    try {

    }
    catch (err) {

    }
}


let handleUpdatePassword = async (req, res) => {
    try {

    }
    catch (err) {

    }
}




export { handleGetAllPasswords, handleCreatePassword, handleDeletePassword, handleUpdatePassword }