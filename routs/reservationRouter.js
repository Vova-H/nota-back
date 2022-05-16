import Router from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import ReservationController from "../controllers/ReservationController.js";

const reservationRouter = new Router()

reservationRouter.post('/reservation', authMiddleware, ReservationController.create)


export default reservationRouter