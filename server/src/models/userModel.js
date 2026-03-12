import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true, match: /^[6-9][0-9]{9}$/ },
    bio: { type: String },
    password: { type: String, required: true, minlength: [8, "Password must be at least 8 characters"] },
    profilePic: { type: String },
    otp: { type: String, default: 0 },
    otpExpireAt: { type: Number, default: 0 }
});

const User = mongoose.model("user", userSchema);

export default User;