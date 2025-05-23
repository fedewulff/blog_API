import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, NavLink, useLocation } from "react-router"
import UpdatePost from "./updatePost"
import newAccessToken from "../functions/refreshToken"

import "../css/postInfo.css"

function Post() {
  const navigate = useNavigate()
  const location = useLocation()
  const [accessToken, setAccessToken] = useState("")
  const { postId } = useParams()
  const [post, setPost] = useState()
  const [showForm, setShowForm] = useState(false)
  const [renderSinglePost, setRenderSinglePost] = useState(false)
  const [error, setError] = useState(``)
  const [loading, setLoading] = useState(true)

  console.log("single posts: ", accessToken)
  useEffect(() => {
    getSinglePost()
  }, [accessToken, renderSinglePost])

  if (location.state && !accessToken) {
    setAccessToken(location.state.accessToken)
  }
  async function getSinglePost() {
    try {
      const response = await fetch(`http://localhost:9000/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        //credentials: "include",
      })
      const data = await response.json()
      //console.log(data.post);
      setPost(data.post)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  function confirmDeletePost(value) {
    const userResponse = confirm("Delete this form?")
    if (userResponse) deletePost(value)
  }
  async function deletePost(value) {
    try {
      const response = await fetch(`http://localhost:9000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
      })
      if (response.status === 403) {
        console.error("403-Forbidden access, getting refresh token")
        refreshToken("delete")
        return
      }
      const data = await response.json()
      //console.log(data);
      navigate("/admin-profile")
    } catch (error) {
      console.error(error)
    }
  }
  async function refreshToken(value) {
    try {
      const accessToken = await newAccessToken()
      if (value === "delete") {
        deletePost(accessToken)
        return
      } else {
        setAccessToken(accessToken)
      }
    } catch (error) {
      console.error("403-Forbidden access, must log in again")
      navigate("/")
    }
  }
  const showFormFunction = () => setShowForm(!showForm)

  const renderSinglePostComponent = () => setRenderSinglePost(!renderSinglePost)

  const deleteAccessToken = () => setAccessToken("delete")
  if (error) {
    return <div>Couldn't fetch API</div>
  }
  if (loading) {
    return <div>Loading . . .</div>
  }
  if (!post) return <div>No posts</div>
  if (accessToken === "delete") {
    navigate("/admin-profile")
    return
  }

  return (
    <div>
      <UpdatePost
        showForm={showForm}
        showFormFunction={showFormFunction}
        post={post}
        renderSinglePostComponent={renderSinglePostComponent}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />
      <div
        className="singlePostContainer"
        style={{
          filter: showForm ? "blur(7px)" : "blur(0px)",
        }}
      >
        <NavLink to="/admin-profile" className="backButton" onClick={deleteAccessToken}>
          HOME
        </NavLink>
        <div className="singlePostButtons">
          <button type="button" className="deletePostButton" onClick={() => confirmDeletePost(accessToken)}>
            DELETE POST
          </button>
          <button type="button" className="updatePostButton" onClick={showFormFunction}>
            UPDATE POST
          </button>
        </div>
        <div className="singlePost">
          <div className="singlePostYellow ">
            <h2 className="singlePostTitle">{post.title}</h2>
            <div className="createdAtAndPublicSinglePost">
              <div className="gridPostCreatedAt">{post.createdAt}</div>
              {post.public && <div className="publicSinglePost">PUBLIC</div>}
              {!post.public && <div className="notPublicSinglePost">NOT PUBLIC</div>}
            </div>
          </div>
          <div className="singlePostText">{post.text}</div>
          <div className="divider">
            <div className="dividerDiv"></div>
          </div>
          <div className="commentsContainer">
            <h2 className="commentsTitle">Comments:</h2>
            {!post.comments[0] && <div className="noComments">No comments</div>}
            {post.comments.map((comment) => {
              return (
                <div className="comment">
                  <div>{comment}</div>
                  <button>Delete</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
