import express from "express";
import {deleteEvent,getEventDetails,getEvents,newEvent,updateEvent, getAdminEvents,} from "../controllers/eventControllers.js";
import { isAuthenticatedUser, authorizeRoles} from "../middlewares/auth.js";
const router = express.Router();

//admin only routes
router.route("/admin/events").post(isAuthenticatedUser, authorizeRoles('admin'), newEvent).get(isAuthenticatedUser, authorizeRoles('admin'), getAdminEvents);
router.route("/admin/events/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateEvent);
router.route("/admin/events/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteEvent);
router.route("/admin/reviews").get(isAuthenticatedUser, authorizeRoles('admin'), getAdminEvents);

//general public routes
router.route("/events").get(getEvents);
router.route("/events/:id").get(getEventDetails);

export default router;