import mongoose from "mongoose"


let passwordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Store a MongoDB ObjectId here
        ref: "User", // acts like foreign key, to link Password Schema to User Schema
        require: true
    },
    site: {
        type: String,
        require: [true, "Site is required"],
        trim: true
    },
    username: {
        type: String,
        require: [true, "Username/Email is required"],
        trim: true,
        // default: ""
    },
    encryptedPassword: {
        type: String,
        require: [true, "Password is required"],
    },
    category: {
        type: String,
        enum: ["Social", "Work", "Entertainment", "Others"],
        default: "Others"
    }
},
    { timestamps: true }

)

let passwords = mongoose.model("Passwords", passwordSchema)

export default passwords