import {default as env} from 'dotenv/config'
import express from "express";
import authRouter from "./routs/authRouter.js";
import ReservationRouter from "./routs/reservationRouter.js";
import {default as sequelize} from './db.js'
import {User, Reservation} from './models/models.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use('/api', authRouter)
app.use('/api', ReservationRouter)
app.use(cors)

const configEnv = env
const user = User
const reservation = Reservation
const PORT = process.env.PORT || 3000

async function startApp() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

export default startApp
