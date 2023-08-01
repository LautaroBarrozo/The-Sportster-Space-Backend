import express from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from './db'
import authRoutes from "./routes/auth.routes"
import cartRoutes from "./routes/cart.routes"
import commentsRoutes from "./routes/comments.routes"

// require("dotenv").config({path:__dirname+'/.env'});

export const DATABASE_URL= process.env.DATABASE_URL as string
export const TOKEN_SECRET= process.env.TOKEN_SECRET as string


const PORT = process.env.PORT || 4000

const app = express()

app.use(cors({origin: "*", credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api", authRoutes)
app.use("/api", cartRoutes)
app.use("/api", commentsRoutes)

connectDB()
app.listen(PORT, () => {
    console.log("Server running on port 4000");
})