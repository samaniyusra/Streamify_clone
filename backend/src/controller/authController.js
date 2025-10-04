
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { upstreamuser } from "../lib/stream.js";
export const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fiels are requires" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "password must be atleast 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "invalid email format" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User with given email is already exists" });
        }
        const idx = Math.floor(Math.random() * 100) + 1
        const randomAvatr = `https://avatar.iran.liara.run/public/${idx}`;

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatr
        });

        try {
            await upstreamuser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || ""
            });

            console.log(`stream created for the user ${newUser.fullName}`);
        } catch (error) {
            console.log("error creating stream user", error);
        }

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",


        })
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        console.log("error in signup controller", error);
        res.status(500).json({ message: error.message });
    }

}
export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "fields required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "user does not exist" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: "password mismatched" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("error in login controller", error);
        res.status(500).json({ message: error.message });
    }


}

export const logut = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "logout successfull" });
}

export const onboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "all fields are mandatory",
                missingFiels: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !learningLanguage && "learningLanguages",
                    !nativeLanguage && "nativeLanguages",
                    !location && "location"
                ].filter(Boolean),
            });


        }


        const updatedUser = await User.findByIdAndUpdate(userId , {
            ...req.body,
            isOnBoarded: true,
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "user does not exist" });
        }

        try {
            await upstreamuser({
                id:updatedUser._id.toString(),
                name:updatedUser.fullName,
                image:updatedUser.profilePic || ""
            })

            console.log("stream user uodate on onboarding");
        } catch (error) {
            console.log("error updating stream user on onboarding",error);
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.log("onboarding eror:", error);
        res.status(500).json({ message: "internal server error" });
    }
}