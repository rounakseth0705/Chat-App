import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Chats from './pages/Chats.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <Login/>
      },
      {
        path: "/chats",
        element: <Chats/>
      },
      {
        path: "/update-profile",
        element: <UpdateProfile/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
