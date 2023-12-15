import express from "express";
import { addUser, sendMail, getAllUsers, loginUser, logout, resetPassword } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/all" , getAllUsers);

router.post("/add" , addUser);
router.post("/login" , loginUser);
router.get("/logout" , logout);

router.post("/forget" , sendMail);

router.post("/reset-password/:resetToken" , resetPassword);

export default router;