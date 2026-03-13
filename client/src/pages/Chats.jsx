import ellipsisIcon from "../assets/ellipsis.svg";
import userIcon from "../assets/user.svg";
import landscapeIcon from "../assets/landscape.svg";
import microphoneIcon from "../assets/microphone.svg";

const Chats = () => {
    return(
        <div className="flex bg-slate-950 h-screen w-screen">
            <div className="flex flex-col items-center gap-5 w-[45vw] bg-slate-800 py-6 px-1.5 sm:gap-8 sm:px-3 sm:w-[38vw] md:py-10 md:w-[33vw] lg:gap-6 lg:w-[30vw] lg:py-8 xl:w-[25vw] xl:py-6">
                <div className="flex justify-between items-center w-full px-3">
                    <h1 className="text-white font-semibold">Chats</h1>
                    <img src={ellipsisIcon} alt="" className="w-8 h-8 cursor-pointer"/>
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
                                <img src={ellipsisIcon} alt="ellipsisIcon" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8"/>
                            </span>
                        </span>
                    </div>
                    <div className="overflow-auto"></div>
                    <div className="pb-2 px-3">
                        <div className="flex justify-between items-center bg-slate-800 rounded-4xl py-3 px-5">
                            <span className="flex justify-center items-center gap-1 sm:gap-3">
                                <span className="">
                                    <img src={landscapeIcon} alt="landscapeIcon" className="w-5 h-5 cursor-pointer sm:w-7 sm:h-7"/>
                                </span>
                                <span className="rounded-full">
                                    <img />
                                </span>
                                <input type="text" placeholder="Type a message" className="text-white outline-0"/>
                            </span>
                            <span className="rounded-full hover:bg-slate-600 transition-all duration-400 ease-in-out p-1">
                                <img src={microphoneIcon} alt="microphone" className="w-5 h-5 cursor-pointer sm:w-7 sm:h-7"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats;