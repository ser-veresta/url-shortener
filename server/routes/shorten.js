import express from "express";
import { shortenUrl, getUserUrl } from "../controller/shorten.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.route("/").post(protect, shortenUrl);

router.route("/user").get(protect, getUserUrl);

export default router;
