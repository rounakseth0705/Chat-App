import { io, userSocketIds } from "../app.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req,res) => {
    try {
        const { receiverId, text } = req.body;
        const image = req.file;
        const senderId = req.user._id;
        if (!receiverId || !senderId) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const receiverSocketId = userSocketIds[receiverId];
        io.to(receiverSocketId).emit("newMessage", { senderId, receiverId, text });
        const senderMessage = await Message.create({ userId: senderId, senderId, receiverId, text });
        await Message.create({ userId: receiverId, senderId, receiverId, text });
        return res.json({ success: true, senderMessage, message: "Text delivered" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getMessages = async (req,res) => {
    try {
        const { receiverId } = req.params;
        const senderId = req.user._id;
        if (!senderId || !receiverId) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const messages = await Message.find({ $or: [{ userId: senderId, senderId, receiverId },{ userId: senderId, senderId: receiverId, receiverId: senderId }] });
        return res.json({ success: true, messages, message: "All messages" });
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