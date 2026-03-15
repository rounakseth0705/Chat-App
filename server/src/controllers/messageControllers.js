import { io, userSocketIds } from "../app.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req,res) => {
    try {
        const { receiverId, text } = req.body;
        const senderId = req.user._id;
        if (!receiverId || !senderId) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const receiverSocketId = userSocketIds[receiverId];
        io.to(receiverSocketId).emit("message", text);
        await Message.create({ userId: senderId, senderId, receiverId, text });
        return res.json({ success: true, message: "Text delivered" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const deleteMessageForMe = async (req,res) => {
    try {
        const { messageId } = req.params;
        const result = await Message.findByIdAndDelete(messageId);
        if (!result) {
            return res.json({ success: false, message: "Couldn't delete the message!" });
        }
        return res.json({ success: true, message: "Message successfully deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const deleteMessageForEveryone = async (req,res) => {
    try {
        const { messageId } = req.params;
        const userId = req.user._id;
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}