import { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext.jsx";

const EditProfile = () => {
    const { user } = useContext(UserContext);
    const [name, setName] = useState(user?.name);
    const [bio, setBio] = useState(user?.bio);
    const handleUpdateProfile = async (event) => {
        event.preventDefault();
    }
    return(
        <div className="flex justify-evenly py-5 px-10 h-screen bg-linear-to-r from-blue-950 to-black">
            <div>
                <h1 className="text-2xl font-semibold text-white">Profile details</h1>
                <form className="flex flex-col justify-center items-center gap-5 py-5">
                    <input onChange={(event) => setName(event.target.value)} value={name} type="text" className="outline-0 bg-slate-700 rounded px-2 py-1"/>
                    <textarea onChange={(event) => setBio(event.target.value)} value={bio} className="bg-slate-700 outline-0 px-2 py-1"></textarea>
                    <button onClick={(event) => handleUpdateProfile(event)} className="bg-purple-500 text-white px-5 py-1 rounded cursor-pointer">Save</button>
                </form>
            </div>
            <div>

            </div>
        </div>
    )
}

export default EditProfile;