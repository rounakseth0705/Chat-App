import { useState } from "react";
import circleUserIcon from "../assets/circleUser.svg";
import SignUp from "../components/SignUp";

const Login = () => {
    const [currentState, setCurrentState] = useState("login");
    return currentState === "login" ? (
        <div className="flex flex-col justify-center items-center gap-5 bg-linear-to-r from-blue-950 to-black h-screen md:gap-8">
            <h1 className="text-center text-blue-900 text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-5xl">User Login</h1>
            <form className="flex flex-col items-center gap-6 bg-slate-950 px-10 py-5 rounded-2xl shadow-2xl">
                <div>
                    <img src={circleUserIcon} alt="circleUserIcon" className="w-20 h-20 sm:w-30 sm:h-30"/>
                </div>
                <div className="flex flex-col justify-center gap-1">
                    <h1 className="text-white">Email</h1>
                    <input type="text" placeholder="enter email" className="outline-0 rounded px-2 py-1.5 bg-slate-600 w-[50vw] text-sm sm:py-2 sm:px-4 sm:text-base sm:w-[45vw] md:w-[40vw] lg:w-[35vw] xl:w-[25vw]"/>
                </div>
                <div className="flex flex-col justify-center gap-1">
                    <h1 className="text-white">Password</h1>
                    <input type="password" placeholder="enter password" className="outline-0 rounded px-2 py-1.5 bg-slate-600 w-[50vw] text-sm sm:py-2 sm:px-4 sm:text-base sm:w-[45vw] md:w-[40vw] lg:w-[35vw] xl:w-[25vw]"/>
                </div>
                <button className="bg-blue-900 text-white px-4 py-1.5 rounded cursor-pointer hover:bg-blue-800 transition-all duration-400 ease-in-out">Login</button>
                <div className="flex justify-center items-center">
                    <h1 onClick={() => setCurrentState("signup")} className="text-white cursor-pointer text-sm sm:text-base">Don't have an account?</h1>
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="text-white cursor-pointer text-sm sm:text-base">Forgot Password?</h1>
                </div>
            </form>
        </div>
    ) : <SignUp setCurrentState={setCurrentState}/>
}

export default Login;