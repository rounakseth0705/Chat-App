import { useState } from "react";

const PendingRequests = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return(
        <div className="flex flex-col items-center h-screen bg-linear-to-r from-blue-950 to-slate-950">
            <h1 className="text-white text-2xl font-semibold">Connect people</h1>
        </div>
    )
}

export default PendingRequests;