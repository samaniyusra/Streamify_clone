
import User from "../models/userModel.js";
import FriendRequest from "../models/friendRequestModel.js";
export const getRecommendedUser = async (req, res) => {
   try {
      const currentUserId = req.user._id;
      const currentUser = req.user;


      const recommendedUser = await User.find({
         $and: [
            { _id: { $ne: currentUserId } },
            { _id: { $nin: currentUser.friends } },
            { isOnBoarded: true },
         ]
      });

      res.status(200).json(recommendedUser);

   } catch (error) {
      console.log("error in get recommended user,", error);
      res.status(500).json({ messsage: "internal server error" });
   }
}

export const getMyFriends = async (req, res) => {
   try {
      const user = await User.findById(req.user._id)
         .select("friends")
         .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

      res.status(200).json(user.friends);

   } catch (error) {
      console.log("error in getMyFriends", error);
      res.status(500).json({ messsage: "internal server error" });
   }
}

export const sendFriendRequest = async (req, res) => {
   try {
      const myId = req.user._id;
      const { id: recipientId } = req.params;

      if (myId == recipientId) {
         return res.status(400).json({ messsage: "you cant send friend request to yourself" });
      }

      const recipient = await User.findById(recipientId);

      if (!recipient) {
         return res.status(404).json({ messsage: "recipient does not found" });
      }

      if (recipient.friends.map(f => f.toString()).includes(myId.toString())) {
         return res.status(409).json({ message: "you are already friend of each other" });
      }


      const existingReq = await FriendRequest.findOne({
         $or: [
            { sender: myId, recipient: recipient },
            { sender: recipient, recipient: myId },

         ]
      });


      if (existingReq) {
         return res.status(400).json({ messsage: "a frind request already eist between you and this user" });
      }

      const friendRequest = await FriendRequest.create({
         sender: myId,
         recipient: recipient,
      });

      res.status(201).json(friendRequest);

   } catch (error) {
      console.log("error in send friend request", error);
      res.status(500).json({ messsage: "internal server error" });

   }
}


export const acceptFriendRequest = async (req, res) => {
   try {
      const { id: requestId } = req.params;
      const friendRequest = await FriendRequest.findById(requestId);


      if (!friendRequest) {
         return res.status(404).json({ messsage: "friend request not found" });
      }

      //verify the current user is reciepient

      if (friendRequest.recipient.toString() !== req.user._id.toString()) {
         return res.status(403).json({ message: "you are not authorized to accept this request" });
      }


      friendRequest.status = "accepted";
      await friendRequest.save();

      //add each user to the others friends array

      await User.findByIdAndUpdate(friendRequest.sender, {
         $addToSet: { friends: friendRequest.recipient }
      });

      await User.findByIdAndUpdate(friendRequest.recipient, {
         $addToSet: { friends: friendRequest.sender }
      });


      res.status(200).json({ message: "friend request accepted" });
   } catch (error) {

      console.log("error in accept friend request", error);
      res.status(500).json({ messsage: "internal server error" });

   }
}

export const getFriendRequests = async (req, res) => {
   try {
      const incomingReqs = await FriendRequest.find({
         recipient: req.user._id,
         status: "pending"
      }).populate("sender", "fullName profilePic learningLanguage nativeLanguage");

      const acceptedReqs = await FriendRequest.find({
         sender: req.user._id,
         status: "accepted"
      }).populate("recipient", "fullName profilePic ");

      res.status(200).json({ incomingReqs, acceptedReqs });
   } catch (error) {
      console.log("error in geFriendrequests", error);
      res.status(500).json({ messsage: "internal server error" });

   }
}

export const getOutgoingFriendReqs = async (req, res) => {
   try {
      const outgoingReqs = await FriendRequest.find({
         sender: req.user._id,
         status: "pending"
      }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

      res.status(200).json(outgoingReqs);
   } catch (error) {
      console.log("error in getOUtgoingreqs", error);
      res.status(500).json({ messsage: "internal server error" });

   }
}
