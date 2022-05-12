import mongoose from "mongoose";

const {Schema, model} = mongoose

const RoleModel = new Schema({
    value: {type: String, unique: true, required: true, default: "USER"}
})

export default model("roles", RoleModel)
