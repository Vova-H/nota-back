import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js";
import {Reservation, User} from "../models/models.js";

class ReservationController {

    async index(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const {id} = jsonwebtoken.verify(token, secret)
            console.log(id)
            const reservations = await Reservation.findAll({where: {userId: id}})
            return res.status(200).json(reservations)
        } catch (e) {
            console.log(e)
            return res.status(400).json({"message": "something wrong"})
        }
    }

    async create(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const {id} = jsonwebtoken.verify(token, secret)
            const user = User.findOne({where: {id: id}})
            console.log(jsonwebtoken.verify(token, secret))
            console.log(user)
            const {date, time, action} = req.body
            const checkDate = await Reservation.findOne({where: {date: date}})
            console.log(checkDate)
            const checkTime = await Reservation.findOne({where: {time: time}})
            console.log(checkTime)

            if (checkDate && checkTime) {
                return res.json({"message": "На текущее время уже есть запись"})
            }
            const reservation = await Reservation.create({date, time, action, userId: id})
            await reservation.save()
            return res.json({"message": "Резервация успешна"})

        } catch (e) {
            console.log(e)
            return res.status(400).json({"message": "reservation failed"})
        }
    }

    async update(req, res) {
        try {

        } catch (e) {

        }
    }

    async delete(req, res) {
        try {

        } catch (e) {

        }
    }

}

export default new ReservationController()
