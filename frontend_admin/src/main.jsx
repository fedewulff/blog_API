import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"
import "./css/main.css"
import Login from "./components/login.jsx"
import Signup from "./components/signup.jsx"
import Profile from "./components/profile.jsx"
import ErrorPage from "./components/errorPage.jsx"
import Post from "./components/post.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin-profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-profile/post/:postId",
    element: <Post />,
    errorElement: <ErrorPage />,
  },
])

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />)
