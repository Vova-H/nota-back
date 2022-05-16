import mongoose from "mongoose";
import ReservationModel from "./RaservationModel.js";

const {Schema, model} = mongoose

const UserModel = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    reservations: [{type: String, ref: 'ReservationModel'}],
    roles: [{type: String, ref: 'RoleModel'}]
})


export default model("users", UserModel)

