import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    password: { type: String, required: true, minlength: [8, "Password must be at least 8 characters"] },
    connectId: [{ id: { type: String }, expiresAt: { type: Date } }],
    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", unique: true }],
    connectedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    profilePicUrl: { type: String },
    otp: { type: String, default: 0 },
    otpExpireAt: { type: Number, default: 0 }
});

const User = mongoose.model("user", userSchema);

export default User;