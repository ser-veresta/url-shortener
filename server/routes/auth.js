import express from "express";
import { protect } from "../middleware/auth.js";
const router = express.Router();

import { activate, forgotPassword, getUser, login, resetPassword, signUp } from "../controller/auth.js";

router.route("/login").post(login);

router.route("/signUp").post(signUp);

router.route("/activate/:activeToken").get(activate);

router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword/:resetToken").patch(resetPassword);

router.route("/getUser").get(protect, getUser);

export default router;
