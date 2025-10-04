import express from "express";
import { protectRoute } from "../middlewares/auth.js";
import { getStreamToken } from "../controller/chatController.js";
const chatRoutes  =  express.Router();

chatRoutes.get("/token", protectRoute, getStreamToken);

export default chatRoutes;