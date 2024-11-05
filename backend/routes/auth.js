import express from "express";
import {updateUserAppointments,registerUser, loginUser, logout, forgotPassword, updateUserNotAdmin, getAllUsers, resetPassword, getUserProfile, updatePassword, updateProfile, getUserDetails, allUsers, updateUser, deleteUser, uploadAvatar, verifyToken} from '../controllers/authControllers.js'
import { isAuthenticatedUser, authorizeRoles} from "../middlewares/auth.js";
const router = express.Router();


//admin only routes
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router.route("/admin/users/:id")
.get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
.put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

//schedule meeting
router.route("/users").get(isAuthenticatedUser, getAllUsers);
router.route("/add-event/:id")
.put(isAuthenticatedUser, updateUserAppointments)

//create login logout account avatar
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser ,getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser ,updateProfile);

router.route("/me/upload_avatar").put(isAuthenticatedUser, uploadAvatar);

router.route("/confirm/:token/:id").post(verifyToken);

export default router;