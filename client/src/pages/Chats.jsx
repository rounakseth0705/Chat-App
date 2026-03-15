import ellipsisIcon from "../assets/ellipsis.svg";
import userIcon from "../assets/user.svg";
import landscapeIcon from "../assets/landscape.svg";
import sendIcon from "../assets/send.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";

const Chats = () => {
    const { logout } = useContext(UserContext);
    const [isLeftMenuClicked, setIsLeftMenuClicked] = useState(false);
    const navigate = useNavigate();
    const handleNavigateToGenerateConnectId = () => {
        if (isLeftMenuClicked) {
            navigate("/generate-connect-id");
        }
    }
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
    return(
        <div className="flex bg-slate-950 h-screen w-screen">
            <div className="flex flex-col items-center gap-5 w-[45vw] bg-slate-800 py-6 px-1.5 sm:gap-8 sm:px-3 sm:w-[38vw] md:py-10 md:w-[33vw] lg:gap-6 lg:w-[30vw] lg:py-8 xl:w-[25vw] xl:py-6">
                <div className="flex justify-between items-center w-full px-3">
                    <h1 className="text-white font-semibold">Chats</h1>
                    <img onClick={() => setIsLeftMenuClicked(prev => !prev)} src={ellipsisIcon} alt="" className="w-6 h-6 cursor-pointer"/>
                </div>
                <div className={`absolute text-xs left-31 top-11 text-white bg-slate-950 py-1 ${isLeftMenuClicked ? "opacity-100" : "opacity-0"} rounded transition-all duration-400 ease-in-out sm:text-base lg:text-sm sm:left-45 md:left-50 md:top-15.5 lg:left-65 lg:top-13.5 xl:top-11`}>
                    <h1 onClick={handleNavigateToGenerateConnectId} className="py-1 px-2 cursor-default hover:bg-slate-900 transition-all duration-400 ease-in-out">Generate Connect ID</h1>
                    <h1 onClick={handleNavigateToRequests} className="py-1 px-2 cursor-default hover:bg-slate-900 transition-all duration-400 ease-in-out">Requests</h1>
                    <h1 onClick={handleNavigateToEditProfile} className="py-1 px-2 cursor-default hover:bg-slate-900 transition-all duration-400 ease-in-out">Edit Profile</h1>
                    <h1 onClick={handleLogout} className="py-1 px-2 cursor-default hover:bg-slate-900 transition-all duration-400 ease-in-out">Logout</h1>
                </div>
                <div>
                    <input type="text" placeholder="Search user" className="bg-gray-500 w-[42vw] text-sm rounded-3xl px-6 py-2 sm:w-[34vw] sm:text-base md:w-[30vw] lg:w-[27vw] xl:w-[22vw]"/>
                </div>
                <div className="bg-slate-900 rounded w-full py-2 px-1 overflow-auto sm:px-2">
                    <div className="flex justify-start items-center gap-1.5 py-2 px-1 rounded-2xl cursor-pointer hover:bg-slate-500 duration-600 ease-in-out sm:gap-5 sm:px-2">
                        <span className="rounded-full bg-slate-600 p-1">
                            <img src={userIcon} alt="" className="w-5 h-5 rounded-full sm:w-8 sm:h-8"/>
                        </span>
                        <h1 className="text-white text-sm sm:text-base">User 1</h1>
                    </div>
                    <div className="flex justify-start items-center gap-1.5 py-2 px-1 rounded-2xl cursor-pointer hover:bg-slate-500 duration-600 ease-in-out sm:gap-5 sm:px-2">
                        <span className="rounded-full bg-slate-600 p-1">
                            <img src={userIcon} alt="" className="w-5 h-5 rounded-full sm:w-8 sm:h-8"/>
                        </span>
                        <h1 className="text-white text-sm sm:text-base">User 1</h1>
                    </div>
                    <div className="flex justify-start items-center gap-1.5 py-2 px-1 rounded-2xl cursor-pointer hover:bg-slate-500 duration-600 ease-in-out sm:gap-5 sm:px-2">
                        <span className="rounded-full bg-slate-600 p-1">
                            <img src={userIcon} alt="" className="w-5 h-5 sm:w-8 sm:h-8"/>
                        </span>
                        <h1 className="text-white text-sm sm:text-base">Userrrr 1</h1>
                    </div>
                </div>
            </div>
            <div className="w-[55vw] sm:w-[62vw] md:w-[67vw] lg:w-[70vw] xl:w-[75vw]">
                <div className="flex flex-col justify-between w-full h-screen">
                    <div className="flex justify-between items-center py-3 px-1 bg-slate-800 sm:px-3">
                        <span className="flex justify-center items-center gap-1.5 sm:px-5 sm:gap-3 md:gap-5">
                            <span className="rounded-full bg-slate-600 p-1">
                                <img src={userIcon} alt="" className="w-6 h-6 sm:w-8 sm:h-8"/>
                            </span>
                            <h1 className="text-white text-sm sm:text-base">User Name</h1>
                        </span>
                        <span className="flex justify-center items-center">
                            <span>
                                <img src={ellipsisIcon} alt="ellipsisIcon" className="w-6 h-6 cursor-pointer sm:w-7 sm:h-7"/>
                            </span>
                        </span>
                    </div>
                    <div className="overflow-auto"></div>
                    <div className="pb-2 px-1 sm:px-3">
                        <div className="flex justify-between items-center w-full bg-slate-800 rounded-4xl py-3 px-1.5 sm:px-5 md:rounded-full md:py-5 lg:py-4 lg:rounded-4xl">
                            <span className="rounded-full pr-1">
                                <img src={landscapeIcon} className="w-5 h-5 cursor-pointer sm:w-7 sm:h-7"/>
                            </span>
                            <input type="text" placeholder="Type a message" className="w-[36vw] flex justify-center items-center outline-0 text-white text-xs sm:text-base sm:w-[45vw]"/>
                            <button>
                                <img src={sendIcon} alt="sendIcon" className="w-5 h-5 cursor-pointer sm:w-7 sm:h-7"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats;