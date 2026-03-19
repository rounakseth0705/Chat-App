import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./AuthContext.jsx";
import toast from "react-hot-toast";
import API from "../config/api.js";

export const MessageContext = createContext();

const MessageProvider = ({ children }) => {
    const { socket } = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const sendMessage = async (text,receiverId,image) => {
        const formData = new FormData();
        formData.append("receiverId",receiverId);
        formData.append("text",text);
        if (image) {
            formData.append("image",image);
        } else {
            formData.append("image","");
        }
        try {
            const response = await API.post("/api/message/send-message", formData);
            if (response) {
                if (response.data.success) {
                    setMessages(prev => [...prev,response.data.senderMessage]);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error("Something went wrong!");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const getMessages = async (receiverId) => {
        try {
            const response = await API.get(`/api/message/get-messages/${receiverId}`);
            if (response) {
                if (response.data.success) {
                    setMessages(response.data.messages);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error("Something went wrong!");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id);
        }
    },[selectedUser]);
    useEffect(() => {
        if (socket) {
            socket?.on("newMessage", (message) => {
                setMessages(prev => [...prev, message]);
            });
        }
        return () => {
            socket?.off();
        }
    },[socket,selectedUser]);
    const value = { selectedUser, setSelectedUser, sendMessage, getMessages, messages }
    return(
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProvider;