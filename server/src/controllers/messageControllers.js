import Message from "../models/messageModel.js";

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