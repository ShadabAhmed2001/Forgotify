import passwords from "../models/passwords.model.js"

/**
 * This function checks if the password exists and its ownership
 */
let checkForExisitingPasswordAndOwnership = async (req, res) => {
    try {
        let existingPassword = await passwords.findById(req.params.id)

        if (!existingPassword) {
            res.status(404).json({
                Status: "failed",
                Message: "Entry not found"
            })
            return false
        }

        // ensure ownership before deleting
        if (existingPassword.user.toString() != req.user._id.toString()) {
            res.status(403).json({
                Status: "failed",
                Message: "Not authorized action"
            })
            return false
        }

        return existingPassword
    }
    catch (err) {
        res.status(500).json({
            Status: "failed",
            Message: err.message
        })
    }
}

export default checkForExisitingPasswordAndOwnership