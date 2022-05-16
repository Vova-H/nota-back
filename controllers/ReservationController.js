import ReservationModel from "../models/RaservationModel.js";


class ReservationController {

    async index(req, res) {
        try {

        } catch (e) {

        }
    }

    async create(req, res) {
        try {
            const {date, time, action} = req.body
            const checkDate = await ReservationModel.findOne({date})
            const checkTime = await ReservationModel.findOne({time})

            if (checkDate && checkTime) {
                return res.json({"message": "На текущее время уже есть запись"})
            }
            const reservation = await new ReservationModel({date, time, action})
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
