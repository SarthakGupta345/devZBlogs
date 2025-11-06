import express from "express"
import { validateEmail, signup, Logout } from "../controllers/Signup.controller";
const router = express.Router()



router.post("/validate", validateEmail);
router.post("/VerifyOTP", signup);
router.post("/logout", Logout);



export default router