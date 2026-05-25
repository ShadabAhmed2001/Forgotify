import mongoose from "mongoose"


let passwordSchema = new mongoose.Schema({
    site: {
        type: String,
        require: [true, "Site is required"],
        trim: true
    },
    username: {
        type: String,
        trim: true,
        default: ""
    },
    encryptedPassword: {
        type: String,
        require: [true, "Password is required"],
    }
})