import {Reservation} from "../models/models.js";

const handlerDataTime = async (date, time) => {
    const reqTime = time.split(':')
    const onlyTime = ((reqTime[0] * 3600 * 1000) + (reqTime[1] * 60 * 1000) - 10800000)
    const onlyDate = Date.parse(date)

    const err = []

    if (onlyDate + onlyTime <= Date.now()) {
        err.push({"message": "вы не можете сделать запись на прошлое время"})
        return err
    }

    const checkDate = await Reservation.findOne({where: {date: date}})
    const checkTime = await Reservation.findOne({where: {time: time}})

    if (checkDate && checkTime) {
        err.push({"message": "На текущее время уже есть запись"})
        return err
    }
    return err
}

export default handlerDataTime
