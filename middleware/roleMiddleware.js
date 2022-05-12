import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js";

export default function (roles) {
    return function (req, res, next) {

        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                res.status(403).json({"message": "Пользователь не авторизирован"})
            }
            const {roles: userRoles} = jsonwebtoken.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                res.status(403).json({"message": "Отказано в доступе"})
            }
            next()
        } catch (e) {
            console.log(e)
            res.status(403).json({"message": "Отказано в доступе"})
        }
    }
}