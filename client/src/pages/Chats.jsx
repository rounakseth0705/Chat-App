import userIcon from "../assets/user.svg";

const Chats = () => {
    return(
        <div className="flex bg-slate-950 h-screen w-screen">
            <div className="flex flex-col items-center w-[30vw] bg-slate-800 py-6 px-3">
                <div>
                    <input type="text" placeholder="Search user" className="bg-gray-500 w-[25vw] rounded-3xl px-6 py-2"/>
                </div>
                <div className="flex justify-evenly items-center py-2 overflow-hidden">
                    <div className="rounded-full">
                        <img src={userIcon} alt="" className="w-10 h-10"/>
                        
                    </div>
                </div>
            </div>
            <div className="w-[70vw]">

            </div>
        </div>
    )
}

export default Chats;