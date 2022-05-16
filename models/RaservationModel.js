import mongoose from "mongoose";

const {Schema, model} = mongoose

const ReservationModel = new Schema({
    date: {type: String, required: true},
    time: {type: String, required: true},
    action: {type: String, required: true},
    person: {type: String, ref: 'UserModel'}
})

export default model("reservations", ReservationModel)
