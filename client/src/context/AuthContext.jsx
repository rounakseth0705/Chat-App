import { createContext, useState } from "react";
import API from "../config/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    const connectToSocket = (userId) => {
        if (!userId || socket?.connected) {
            return;
        }
        const newSocket = io(import.meta.env.VITE_BACKEND_URL, { query: { userId } });
        setSocket(newSocket);
    }
    const signUp = async (name,email,password) => {
        try {
            const response = await API.post("/api/user/register", { name, email, password });
            if (response) {
                if (response.data.success) {
                    localStorage.setItem("token", response.data.token);
                    setUser(response.data.user);
                    setToken(response.data.token);
                    setIsLoggedIn(true);
                    connectToSocket(response.data.user._id);
                    navigate("chats");
                    toast.success(response.data.message);
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
    const login = async (email,password) => {
        try {
            const response = await API.post("/api/user/login", { email, password });
            if (response) {
                if (response.data.success) {
                    localStorage.setItem("token", response.data.token);
                    setUser(response.data.user);
                    setToken(response.data.token);
                    setIsLoggedIn(true);
                    connectToSocket(response.data.user._id);
                    navigate("chats");
                    toast.success(response.data.message);
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
    const logout = async () => {
        try {
            localStorage.clear();
            setUser(null);
            setToken(null);
            setIsLoggedIn(false);
            socket.disconnect();
            navigate("/");
            toast.success("Logged out successfully");
        } catch(error) {
            toast.error(error.message);
        }
    }
    const verifyUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const response = await API.get("/api/user/verify-user");
            if (response) {
                if (response.data.success) {
                    setUser(response.data.user);
                    setIsLoggedIn(true);
                    connectToSocket(response.data.user._id);
                } else {
                    logout();
                    toast.error(response.data.message);
                }
            } else {
                logout();
                toast.error("Something went wrong!");
            }
        } catch(error) {
            logout();
        }
    }
    useEffect(() => {
        verifyUser();
    },[]);
    const value = { user, isLoggedIn, socket, signUp, login, verifyUser, logout };
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider;