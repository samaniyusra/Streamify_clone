import expres from "express";
import { protectRoute } from "../middlewares/auth.js";
import { getRecommendedUser,
     getMyFriends,
      sendFriendRequest, 
      acceptFriendRequest,
       getFriendRequests, 
       getOutgoingFriendReqs} from "../controller/userController.js";
const userRouter = expres.Router();

userRouter.use(protectRoute);

userRouter.get("/", getRecommendedUser);
userRouter.get("/friends", getMyFriends);

userRouter.post("/friend-request/:id", sendFriendRequest);

userRouter.put("/friend-request/:id/accept", acceptFriendRequest);

userRouter.get("/friend-requests", getFriendRequests);
userRouter.get("/outgoing-friend-requests", getOutgoingFriendReqs);
export default userRouter;