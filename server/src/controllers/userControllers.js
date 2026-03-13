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
        const existingUser = await User.findOne({ email }).populate("connectedUsers","name bio");
        if (!existingUser) {
            return res.json({ success: false, message: "Invalid mobile no. or email id" });
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

export const generateConnectId = async (req,res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.json({ success: false, message: "User not logged in" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const connectId = nanoid(10);
        const isConnectIdExists = user?.connectId.some(userConnectId => userConnectId.id === connectId);
        if (isConnectIdExists) {
            return res.json({ success: false, message: "Can't generate connect id, try again!" });
        }
        if (!user.connectId) {
            user.connectId = [{ id: connectId, expiresAt: new Date(Date.now() + 5*60*1000) }];
        } else {
            user.connectId.push({ id: connectId, expiresAt: new Date(Date.now() + 5*60*1000) });
        }
        await user.save();
        return res.json({ success: true, message: "Connect Id generated" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const updateProfileDetails = async (req,res) => {
    try {
        
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}