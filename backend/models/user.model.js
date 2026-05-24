import mongoose from "mongoose"

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        require: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        require: [true, "Password is required"],
        minlength: [6, "Password must contain 6 characters"]
    }
})

let user = mongoose.model("User", userSchema)

export default user