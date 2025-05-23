import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import "../css/profile.css"
import NavBar from "./navBar"
import CreatePost from "./createPost"
import AllPosts from "./allPosts"
import newAccessToken from "../functions/refreshToken"
import isTokenExpired from "../functions/isTokenExpired"

function Profile() {
  const location = useLocation()
  const navigate = useNavigate()
  const [accessToken, setAccessToken] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [renderPosts, setRenderPosts] = useState(false)

  // console.log(location.state)
  console.log("profile: ", accessToken)
  if (accessToken === "logout") {
    navigate("/")
    return
  }

  if (location.state && !accessToken) {
    setAccessToken(location.state.token)
    return
  }
  if (!location.state && !accessToken) {
    refreshToken()
    return
  }
  async function refreshToken() {
    try {
      const accessToken = await newAccessToken()
      console.log("refresh", accessToken)
      if (location.state) {
        console.log(123)
        navigate(location.pathname, { state: null })
      }
      setAccessToken(accessToken)
    } catch (error) {
      console.error("403-Forbidden access, must log in again")
      navigate("/")
    }
  }
  function eraseAccessToken(value) {
    setAccessToken(value)
  }
  const showFormFunction = () => {
    setShowForm(!showForm)
  }
  const renderPostsComponent = () => {
    setRenderPosts(!renderPosts)
  }

  return (
    <div>
      <CreatePost
        accessToken={accessToken}
        showForm={showForm}
        showFormFunction={showFormFunction}
        renderPostsComponent={renderPostsComponent}
        setAccessToken={setAccessToken}
      />
      <div
        className="profileContainer"
        style={{
          filter: showForm ? "blur(7px)" : "blur(0px)",
        }}
      >
        <NavBar accessToken={accessToken} eraseAccessToken={eraseAccessToken} showFormFunction={showFormFunction} />
        <AllPosts
          accessToken={accessToken}
          renderPosts={renderPosts}
          setAccessToken={setAccessToken}
          eraseAccessToken={eraseAccessToken}
          refreshToken={refreshToken}
        />
      </div>
    </div>
  )
}

export default Profile
