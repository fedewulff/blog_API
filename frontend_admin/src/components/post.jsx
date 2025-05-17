import { useState, useEffect } from "react"
import { useParams, useNavigate, NavLink } from "react-router"
import UpdatePost from "./updatePost"

import "../css/postInfo.css"

function Post() {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [post, setPost] = useState()
  const [showForm, setShowForm] = useState(false)
  const [renderSinglePost, setRenderSinglePost] = useState(false)

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
      console.error(error)
    }
  }
  async function deletePost() {
    const userResponse = confirm("Delete this form?")
    if (userResponse) {
      try {
        const response = await fetch(`http://localhost:9000/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          //credentials: "include",
        })
        const data = await response.json()
        //console.log(data);
        navigate("/admin-profile")
      } catch (error) {
        console.error(error)
      }
    }
  }
  useEffect(() => {
    getSinglePost()
  }, [renderSinglePost])

  const showFormFunction = () => {
    setShowForm(!showForm)
  }
  const renderSinglePostComponent = () => {
    setRenderSinglePost(!renderSinglePost)
  }

  if (!post) return

  return (
    <div>
      <UpdatePost showForm={showForm} showFormFunction={showFormFunction} post={post} renderSinglePostComponent={renderSinglePostComponent} />
      <div
        className="singlePostContainer"
        style={{
          filter: showForm ? "blur(7px)" : "blur(0px)",
        }}
      >
        <NavLink to="/admin-profile" className="backButton">
          HOME
        </NavLink>

        <div className="singlePostButtons">
          <button type="button" className="deletePostButton" onClick={deletePost}>
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
