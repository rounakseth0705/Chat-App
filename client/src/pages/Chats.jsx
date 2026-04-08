import ellipsisIcon from "../assets/ellipsis.svg";
import userIcon from "../assets/user.svg";
import landscapeIcon from "../assets/landscape.svg";
import sendIcon from "../assets/send.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { MessageContext } from "../context/MessageContext.jsx";
import { useRef } from "react";

const Chats = () => {
    const { user, logout } = useContext(UserContext);
    const { sendMessage, selectedUser, setSelectedUser, messages } = useContext(MessageContext);
    const [isLeftMenuClicked, setIsLeftMenuClicked] = useState(false);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [resultUsers, setResultUsers] = useState([]);
    const navigate = useNavigate();
    const chatBox = useRef(null);
    const handleNavigateToRequests = () => {
        if (isLeftMenuClicked) {
            navigate("/pending-requests");
        }
    }
    const handleNavigateToEditProfile = () => {
        if (isLeftMenuClicked) {
            navigate("/edit-profile");
        }
    }
    const handleLogout = async () => {
        if (isLeftMenuClicked) {
            await logout();
        }
    }
    const handleIsLeftMenuClicked = () => {
        if (isLeftMenuClicked) {
            setIsLeftMenuClicked(false);
        }
    }
    const handleSendMessage = async () => {
        await sendMessage(text,selectedUser._id,image);
        setText("");
    }
    useEffect(() => {
        if (chatBox.current) {
            chatBox.current.scrollTop = chatBox.current?.scrollHeight;
        }
    },[messages]);
    useEffect(() => {
        const result = user?.connectedUsers.filter(connectedUser => connectedUser.name.toLowerCase().includes(searchQuery.toLowerCase().trim()));
        setResultUsers(result);
    },[searchQuery]);
    return(
        <div className="flex bg-slate-950 h-screen w-screen">
            <div onClick={handleIsLeftMenuClicked} className="flex flex-col items-center gap-5 w-[45vw] border-r bg-slate-800 py-6 px-1.5 sm:gap-8 sm:px-3 sm:w-[38vw] md:py-10 md:w-[33vw] lg:gap-6 lg:w-[30vw] lg:py-8 xl:w-[25vw] xl:py-6">
                <div className="flex justify-between items-center w-full px-1.5 sm:px-3">
                    <h1 className="text-white text-sm font-semibold sm:text-base">Hi, {user?.name.split(" ")[0]}! ✋</h1>
                    <img onClick={() => setIsLeftMenuClicked(prev => !prev)} src={ellipsisIcon} alt="" className="w-5 h-5 cursor-pointer sm:w-6 sm:h-6"/>
                </div>
                <span className={`absolute text-xs left-[37vw] top-11 text-white bg-slate-950 py-1 ${isLeftMenuClicked ? "inline" : "hidden"} rounded transition-all duration-400 ease-in-out sm:text-base sm:left-[32vw] md:left-[28vw] md:top-15.5 lg:text-sm lg:left-[26vw] lg:top-13.5 xl:left-[22vw] xl:top-11`}>
                    <h1 onClick={handleNavigateToRequests} className="py-1 px-2 cursor-pointer hover:bg-slate-900 transition-all duration-400 ease-in-out">Requests</h1>
                    <h1 onClick={handleNavigateToEditProfile} className="py-1 px-2 cursor-pointer hover:bg-slate-900 transition-all duration-400 ease-in-out">Edit Profile</h1>
                    <h1 onClick={handleLogout} className="py-1 px-2 cursor-pointer hover:bg-slate-900 transition-all duration-400 ease-in-out">Logout</h1>
                </span>
                <div>
                    <input onChange={(event) => setSearchQuery(event.target.value)} value={searchQuery} type="text" placeholder="Search user" className="bg-gray-500 w-[42vw] text-sm rounded-3xl px-4 py-1 sm:py-2 sm:px-6 sm:w-[34vw] sm:text-base md:w-[30vw] lg:w-[27vw] xl:w-[22vw]"/>
                </div>
                <div className="bg-slate-900 rounded w-full py-2 px-1 overflow-auto sm:px-2">
                    { user?.connectedUsers.length > 0 && searchQuery === "" ?
                        user?.connectedUsers.map((connectedUser,index) => (
                            <div key={index} onClick={() => setSelectedUser(connectedUser)} className={`flex justify-start items-center gap-1.5 ${selectedUser?._id === connectedUser._id ? "bg-slate-500" : ""} py-2 px-1 rounded cursor-pointer hover:bg-slate-500 duration-600 ease-in-out sm:gap-5 sm:px-2`}>
                                <span className="rounded-full bg-slate-600 p-1">
                                    <img src={connectedUser?.profilePicUrl ? connectedUser.profilePicUrl : userIcon} alt="" className="w-5 h-5 rounded-full sm:w-8 sm:h-8"/>
                                </span>
                                <h1 className="text-white text-sm sm:text-base">{connectedUser.name}</h1>
                            </div>
                        )) : searchQuery !== "" ?
                        resultUsers?.map((connectedUser,index) => (
                            <div key={index} onClick={() => setSelectedUser(connectedUser)} className={`flex justify-start items-center gap-1.5 ${selectedUser?._id === connectedUser._id ? "bg-slate-500" : ""} py-2 px-1 rounded cursor-pointer hover:bg-slate-500 duration-600 ease-in-out sm:gap-5 sm:px-2`}>
                                <span className="rounded-full bg-slate-600 p-1">
                                    <img src={connectedUser?.profilePicUrl ? connectedUser.profilePicUrl : userIcon} alt="" className="w-5 h-5 rounded-full sm:w-8 sm:h-8"/>
                                </span>
                                <h1 className="text-white text-sm sm:text-base">{connectedUser.name}</h1>
                            </div>
                        )) :
                        <div>Find peoples to connect.</div>
                    }
                </div>
            </div>
            <div className="w-[55vw] sm:w-[62vw] md:w-[67vw] lg:w-[70vw] xl:w-[75vw]">
                { selectedUser ?
                    <div className="flex flex-col justify-between w-full h-screen">
                        <div className="flex justify-between items-center py-3 px-1 bg-slate-800 shadow-2xl h-[10%] sm:px-3">
                            <span className="flex justify-center items-center gap-1.5 sm:px-5 sm:gap-3 md:gap-5">
                                <span className="rounded-full bg-slate-600 p-1">
                                    <img src={userIcon} alt="" className="w-6 h-6 sm:w-8 sm:h-8"/>
                                </span>
                                <h1 className="text-white text-xs sm:text-base">{selectedUser.name}</h1>
                            </span>
                            <span className="flex justify-center items-center">
                                <span>
                                    <img src={ellipsisIcon} alt="ellipsisIcon" className="w-6 h-6 cursor-pointer sm:w-7 sm:h-7"/>
                                </span>
                            </span>
                        </div>
                        <div ref={chatBox} className="flex flex-col overflow-auto px-15 h-[80%] py-[1vh]">
                            { messages.length > 0 &&
                                messages.map((message,index) => (
                                    <span key={index} className={`flex ${message.senderId === user._id && message.receiverId === selectedUser._id ? "justify-end" : "justify-start"}`}>
                                        <span className={`flex ${message.senderId === user._id && message.receiverId === selectedUser._id ? "bg-linear-to-r from-blue-400 to-purple-400" : "bg-slate-600"} gap-1.5 rounded my-[0.2vh] px-[0.5vw] text-white`}>
                                            <h1 className="flex items-center my-[1vh]">{message.text}</h1>
                                            <h1 className="flex items-end text-sm">{new Date(message.createdAt).toLocaleTimeString("en-IN",{ hour: "numeric", minute: "2-digit", hour12: true })}</h1>
                                        </span>
                                    </span>
                                ))
                            }
                        </div>
                        <div className="pb-2 px-1 h-[10%] sm:px-3">
                            <div className="flex justify-between items-center w-full bg-slate-800 rounded-4xl py-3 px-1.5 sm:px-5 md:rounded-full md:py-5 lg:py-4 lg:rounded-4xl">
                                <span className="rounded-full pr-1">
                                    <img src={landscapeIcon} className="w-5 h-5 cursor-pointer sm:w-7 sm:h-7"/>
                                </span>
                                <input onChange={(event) => setText(event.target.value)} value={text} type="text" placeholder="Type a message" className="w-[36vw] flex justify-center items-center outline-0 text-white text-xs sm:text-base sm:w-[45vw]"/>
                                <button onClick={handleSendMessage}>
                                    <img src={sendIcon} alt="sendIcon" className="w-5 h-5 cursor-pointer sm:w-7 sm:h-7"/>
                                </button>
                            </div>
                        </div>
                    </div> :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default Chats;