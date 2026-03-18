import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import MessageProvider from "./context/MessageContext";

const App = () => {
    return(
        <>
            <AuthProvider>
                <MessageProvider>
                    <Toaster/>
                    <Outlet/>
                </MessageProvider>
            </AuthProvider>
        </>
    )
}

export default App;