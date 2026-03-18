import { createContext, useContext } from "react";
import { UserContext } from "./AuthContext.jsx";
import toast from "react-hot-toast";
import API from "../config/api.js";

export const MessageContext = createContext();

const MessageProvider = ({ children }) => {
    const { socket } = useContext(UserContext);
    const sendMessage = async (receiverId,text,image) => {
        const formData = new FormData();
        formData.append("receiverId",receiverId);
        formData.append("text",text);
        formData.append("image",image);
        try {
            const response = await API.post("/api/send-message", formData);
            if (response) {
                if (response.data.success) {
                     
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
    const value = { sendMessage }
    return(
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProvider;