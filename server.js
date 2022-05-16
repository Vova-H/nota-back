import {} from 'dotenv/config'
import mongoose from "mongoose";
import express from "express";
import authRouter from "./routs/authRouter.js";
import ReservationRouter from "./routs/reservationRouter.js";

const app = express()
app.use(express.json())
app.use('/api', authRouter)
app.use('/api', ReservationRouter)

const db_URL = "mongodb+srv://admin:admin@cluster0.i9out.mongodb.net/nota"
const PORT = process.env.PORT || 3000

async function startApp() {
    try {
        await mongoose.connect(db_URL)
        app.listen(PORT, () => console.log(`server running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

export default startApp
