import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

export const register = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Details missing" });
        }
        if (password.length < 8 || password.length > 20) {
            return res.json({ success: false, message: "Invalid password" });
        }
        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.json({ success: false, message: "Mobile or email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ success: true, user, token, message: "Account created" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Details missing" });
        }
        const existingUser = await User.findOne({ email }).populate("connectedUsers","name bio profilePicUrl");
        if (!existingUser) {
            return res.json({ success: false, message: "Invalid email" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ success: true, user: existingUser, token, message: "Logged in successfully" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const verifyUser = async (req,res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.json({ success: false, message: "User not logged in" });
        }
        const user = await User.findById(userId).populate("connectedUsers","name bio profilePicUrl");
        if (!user) {
            return res.json({ success: false, message: "Invalid credientials" });
        }
        return res.json({ success: true, user, message: "User logged in" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const sendConnectionRequest = async (req,res) => {
    try {
        const { email } = req.body;
        const senderId = req.user._id;
        if (!email || !senderId) {
            return res.json({ success: false, message: "Details missing" });
        }
        const user = await User.findById(senderId);
        if (!user) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        if (email === user.email) {
            return res.json({ success: false, message: "Can't send the request" });
        }
        const receiver = await User.findOne({ email });
        if (!receiver) {
            return res.json({ success: false, message: "Invalid email id" });
        }
        if (receiver.pendingRequests.includes(senderId)) {
            return res.json({ success: false, message: "Can't request the user again!" });
        }
        if (receiver.connectedUsers.includes(senderId) || user.connectedUsers.includes(receiver._id)) {
            return res.json({ success: false, message: "Already connected" });
        }
        receiver.pendingRequests.push(senderId);
        await receiver.save();
        return res.json({ success: true, message: "Request sent" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const connectUser = async (req,res) => {
    try {
        const { requestedUserId } = req.body;
        const userId = req.user._id;
        if (!requestedUserId || !userId) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const user = await User.findById(userId);
        const requestedUser = await User.findById(requestedUserId);
        if (!requestedUser) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        if (!user) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        if (!user.connectedUsers) {
            user.connectedUsers = [requestedUserId];
        } else {
            user.connectedUsers.push(requestedUserId);
        }
        user.pendingRequests = user.pendingRequests.filter(pendingRequest => !pendingRequest.equals(requestedUserId));
        requestedUser.connectedUsers.push(userId);
        await user.save();
        await requestedUser.save();
        return res.json({ success: false,  message: "Request accepted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const updateProfileDetails = async (req,res) => {
    try {
        const { name, bio } = req.body;
        const { profileImage } = req.file;
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (profileImage === "") {
            if (name && bio) {
                user.name = name;
                user.bio = bio;
            } else if (name) {
                user.name = name;
            } else if (bio) {
                user.bio = bio;
            }
        } else {
            
        }
        await user.save();
        return res.json({ success: true, message: "Details updated" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const deleteUser = async (req,res) => {
    try {
        const userId = req.body._id;
        if (!userId) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const result = await User.findByIdAndDelete(userId);
        if (!result) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        return res.json({ success: true, message: "Account deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}