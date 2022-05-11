import {} from 'dotenv/config'
import mongoose from "mongoose";
import express from "express";

const app = express()
app.use(express.json())

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
