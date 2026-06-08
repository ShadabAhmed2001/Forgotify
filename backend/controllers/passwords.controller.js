import CrytpoJS from "crypto-js"
import passwords from "../models/passwords.model.js";

// let crypto_secret = process.env.CRYPTO_SECRET

/**
 * This function returns the encrypted password
 */
let handlePasswordEncrypt = (pass) => {
    return CrytpoJS.AES.encrypt(pass, process.env.CRYPTO_SECRET).toString()
}

/**
 * This function returns the decrypted password
 */
let handlePasswordDecrypt = (pass) => {
    return CrytpoJS.AES.decrypt(pass, process.env.CRYPTO_SECRET).toString(CrytpoJS.enc.Utf8)
}

/**
 * This function create a new password entry by encrypting it
 */
let handleCreatePassword = async (req, res) => {
    try {
        let { site, category = "other", username = "", password } = req.body

        // check if site and password is sent in payload
        if (!site || !password) {
            res.status(400).json({
                Status: "failed",
                Message: "Site and password are required."
            })
            return
        }

        // create a entry for new password 
        let newEntry = await passwords.create({
            user: req.user._id, // user is added to req in authMiddleware 
            site,
            username,
            encryptedPassword: handlePasswordEncrypt(password),
            category,
        })

        // if new entry is made, then send the success response
        res.status(201).json({
            Status: "success",
            _id: newEntry._id, // unique id for new password, not user
            Site: newEntry.site,
            Username: newEntry.username,
            Password: handlePasswordDecrypt(newEntry.encryptedPassword), // todo: can return "", as the UI will still have entered password in memory and can display instantly
            category: newEntry.category,
            CreatedAt: newEntry.createdAt
        })
    }
    catch (err) {
        res.status(500).json({
            Status: "failed",
            Message: err.message
        })
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

/**
 * This function gets all passwords for logged in user and decrypts them
 */
let handleGetAllPasswords = async (req, res) => {
    try {
        let passwordList = await passwords.find({ user: req.user._id }).sort({ createdAt: -1 }) // find and sort newest first


        if (passwordList.length == 0) {
            res.status(201).json({
                Status: "success",
                Data: []
            })
            return
        }

        // decrpyt the encrypted passwords before sending the response
        passwordList = passwordList.map(ele => {
            return {
                _id: ele._id,
                Site: ele.site,
                Username: ele.username,
                Password: handlePasswordDecrypt(ele.encryptedPassword),
                Category: ele.category,
                CreatedAT: ele.createdAt
            }
        })

        res.status(201).json({
            Status: "success",
            Data: passwordList
        })

    }
    catch (err) {
        res.status(500).json({
            Status: "failed",
            Message: err.message
        })
    }
}





export { handleGetAllPasswords, handleCreatePassword, handleDeletePassword, handleUpdatePassword }