import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import "../css/profile.css"
import NavBar from "./navBar"
import CreatePost from "./createPost"
import AllPosts from "./allPosts"

function Profile() {
  const location = useLocation()
  const navigate = useNavigate()
  const [accessToken, setAccessToken] = useState("")
  const [error, setError] = useState(``)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [renderPosts, setRenderPosts] = useState(false)

  //console.log(location.state)

  if (location.state && !accessToken) {
    setAccessToken(location.state.token)
  }
  async function ogAccessToken(param) {
    try {
      const response = await fetch("http://localhost:9000/admin/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${param}`,
        },
        //credentials: "include",
      })
      if (response.status === 403) {
        console.error("403-Forbidden access, getting refresh token")
        refreshToken()
        return
      }
      const userProfile = await response.json()
      setUserProfile(userProfile)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  async function refreshToken() {
    try {
      const response = await fetch("http://localhost:9000/admin/refresh", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      const userProfile = await response.json()
      ogAccessToken(userProfile.accessToken)
    } catch (error) {
      console.error("403-Forbidden access, must log in again")
      navigate("/")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (accessToken && accessToken !== "logout") {
      ogAccessToken(accessToken)
    }
    if (!accessToken) {
      refreshToken()
    }
    if (accessToken === "logout") {
      navigate("/")
    }
  }, [accessToken])
  function eraseAccessToken(value) {
    setAccessToken(value)
  }
  const showFormFunction = () => {
    setShowForm(!showForm)
  }
  const renderPostsComponent = () => {
    setRenderPosts(!renderPosts)
  }
  if (error) {
    return <div>Couldn't fetch API</div>
  }
  if (loading) {
    return <div>Loading . . .</div>
  }
  if (accessToken && accessToken !== "logout") {
    return (
      <div>
        <CreatePost showForm={showForm} showFormFunction={showFormFunction} renderPostsComponent={renderPostsComponent} userId={userProfile.user} />
        <div
          className="profileContainer"
          style={{
            filter: showForm ? "blur(7px)" : "blur(0px)",
          }}
        >
          <NavBar eraseAccessToken={eraseAccessToken} showFormFunction={showFormFunction} accessToken={accessToken} />
          <AllPosts renderPosts={renderPosts} eraseAccessToken={eraseAccessToken} />
        </div>
      </div>
    )
  }
}
export default Profile
