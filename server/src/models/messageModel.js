import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    text: { type: String },
    documentUrl: { type: String },
    imageUrl: { type: String },
    seen: { type: Boolean, required: true, default: false }
});

const Message = mongoose.model("message", messageSchema);

export default Message;