import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req,res) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !email || !mobile || !password) {
            return res.json({ success: false, message: "Details missing" });
        }
        if (password.length < 8 || password.length > 20) {
            return res.json({ success: false, message: "Invalid password" });
        }
        const isUserExists = await User.findOne({ $or: [{ email },{ mobile }] });
        if (isUserExists) {
            return res.json({ success: false, message: "Mobile or email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, mobile, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ success: true, user, token, message: "Account created" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const login = async (req,res) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.json({ success: false, message: "Details missing" });
        }
        const existingUser = await User.findOne({ $or: [{ email: identifier },{ mobile: identifier }] });
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