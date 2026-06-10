import passwords from "../models/passwords.model.js";
import { checkForExisitingPasswordAndOwnership, handlePasswordDecrypt, handlePasswordEncrypt } from "../utils/helpers.js";

// let crypto_secret = process.env.CRYPTO_SECRET

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

/**
 * This function handles deleting of password
 */
let handleDeletePassword = async (req, res) => {
    try {

        let result = await checkForExisitingPasswordAndOwnership(req, res)

        if (!result) return


        // await result.findByIdAndDelete(req.params.id)
        await result.deleteOne()

        res.json({
            Status: "success",
            Message: "Password deleted successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            Status: "failed",
            Message: err.message
        })
    }
}

/**
 * This function handles password updation
 */
let handleUpdatePassword = async (req, res) => {
    try {
        let result = await checkForExisitingPasswordAndOwnership(req, res)

        if (!result) return

        let { site, username, password, category } = req.body

        result.site = site || result.site
        result.username = username || result.username
        result.category = category || result.category
        if (password) {
            result.encryptedPassword = handlePasswordEncrypt(password)
        }

        await result.save()

        res.status(200).json({
            Status: "success",
            _id: result._id,
            Site: result.site,
            Username: result.username,
            Password: password || handlePasswordDecrypt(password),
            Category: result.category
        })
    }
    catch (err) {
        res.status(500).json({
            Status: "failed",
            Message: err.message
        })
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