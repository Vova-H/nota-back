import RoleModel from "../models/RoleModel.js";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt"
import {validationResult} from "express-validator";
import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js"

const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jsonwebtoken.sign(payload, secret)
}

class AuthController {

    async getUsers(req, res) {
        try {
            const users = await UserModel.find()
            return res.status(200).json(users)
        } catch (e) {
            return res.status(400).json({"message": "getting error"})
        }
    }

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({"message": "Ошибка при регистрации", errors})
            }
            const {name, surname, email, password} = req.body
            const candidate = await UserModel.findOne({email})
            if (candidate) {
                return res.status(400).json({"message": "Пользователь с тами логином уже сущесвтует"})
            }
            const hashPassword = await bcrypt.hashSync(password, 7)
            const userRole = await RoleModel.findOne({value: "USER"})
            const user = await new UserModel({name, surname, email, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({"message": "Пользователь был успешно зареестрирован"})

        } catch (e) {
            console.log(e)
            return res.status(400).json({"message": "registration failed"})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await UserModel.findOne({email})
            if (!user) {
                return res.status(400).json({"message": "Такого пользователя не существует"})
            }
            const encryptPassword = await bcrypt.compareSync(password, user.password)
            if (!encryptPassword) {
                return res.status(400).json({"message": "Пароль не верный"})
            }
            const token = await generateAccessToken(user._id, user.roles)
            return res.json(token)
        } catch (e) {
            console.log(e)
            return res.status(400).json({"message": "log in failed"})
        }
    }

}

export default new AuthController()
