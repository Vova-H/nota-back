import Router from "express";
import AuthController from "../controllers/AuthController.js";
import {check} from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const authRouter = new Router()

authRouter.get('/users', authMiddleware, roleMiddleware(["ADMIN"]), AuthController.getUsers)
authRouter.post('/registration', [
    check('name', "Имя не может быть пустым").notEmpty({ignore_whitespace: true}),
    check('surname', "Имя не может быть пустым").notEmpty({ignore_whitespace: true}),
    check('password', "пароль не может быть пустой строкой").notEmpty({ignore_whitespace: true}),
    check('password', "пароль должен быть не меньше 4 символов").isLength({min: 4, max: 15}),
    check('email', "Введен некорректный email").isEmail()
], AuthController.registration)
authRouter.post('/login', AuthController.login)

export default authRouter;
