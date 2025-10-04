import express from "express";
import { login, logut, signUp,onboard } from "../controller/authController.js";
import { protectRoute } from "../middlewares/auth.js";
const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logut);

authRouter.post("/onboarding", protectRoute, onboard);

authRouter.get("/me", protectRoute, (req,res) => {
res.status(200).json({success:true, user:req.user});
})
export default authRouter;