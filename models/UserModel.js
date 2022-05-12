import mongoose from "mongoose";
const {Schema, model} = mongoose

const UserModel = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'RoleModel'}]
})



export default model("users", UserModel)

