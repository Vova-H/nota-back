import Router from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import AdminController from "../controllers/AdminController.js";

const adminRouter = new Router()

adminRouter.get('/admin-users', authMiddleware, roleMiddleware(["ADMIN"]), AdminController.getAllUsers)
adminRouter.get('/admin-reservations', authMiddleware, roleMiddleware(["ADMIN"]), AdminController.getAllReservations)


export default adminRouter;
