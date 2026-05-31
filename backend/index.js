import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import passwordsRoutes from "./routes/passwords.routes.js"
import mongoose from "mongoose";

const app = express()
app.use(express.json()) // allows your Express server to read JSON data sent from frontend or API clients.

dotenv.config() // to read env variables from .env file


app.get("/health", (req, res) => { res.send("API is working") }) // health check route

app.use("/api/auth", authRoutes) // routes for user registration and login
app.use("/api/passwords", passwordsRoutes) // routes related to passwords 

app.listen(process.env.PORT)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((err) => {
        process.exit(1)
    }) 