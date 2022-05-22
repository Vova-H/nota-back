import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js";
import {Reservation, User} from "../models/models.js";
import handlerDataTime from "../handlers/handlerDataTime.js";

class ReservationController {

    async index(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const {id} = jsonwebtoken.verify(token, secret)
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
            const {id} = await jsonwebtoken.verify(token, secret)
            const user = await User.findOne({where: {id: id}})
            const {date, time, action} = await req.body

            const result = await handlerDataTime(date, time)

            if (result.length !== 0) {
                return res.status(400).json({'message': result[0].message})
            }

            const reservation = await Reservation.create({
                date,
                time,
                action,
                userId: id,
                client: [user.name, user.surname]
            })
            await reservation.save()
            return res.json({"message": "Резервация успешна"})


            // const reqTime = time.split(':')
            // const onlyTime = ((reqTime[0] * 3600 * 1000) + (reqTime[1] * 60 * 1000) - 10800000)
            // const onlyDate = Date.parse(date)
            //
            // if (onlyDate + onlyTime <= Date.now()) {
            //     return res.json({"message": "вы не можете сделать запись на прошлое время"})
            // }
            //
            // const checkDate = await Reservation.findOne({where: {date: date}})
            // const checkTime = await Reservation.findOne({where: {time: time}})
            //
            // if (checkDate && checkTime) {
            //     return res.json({"message": "На текущее время уже есть запись"})
            // }


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
