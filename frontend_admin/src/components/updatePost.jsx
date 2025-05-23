import { useState } from "react"
import { useParams } from "react-router"
import newAccessToken from "../functions/refreshToken"

function UpdatePost({ showForm, showFormFunction, post, renderSinglePostComponent, accessToken, setAccessToken }) {
  const [title, setTitle] = useState(post.title)
  const [text, setText] = useState(post.text)
  const [publish, setPublish] = useState(post.public)
  const { postId } = useParams()

  console.log("update post: ", accessToken)
  async function updatePost(e, value) {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:9000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
        body: JSON.stringify({ title, text, publish, postId }),
      })
      if (response.status === 403) {
        console.error("403-Forbidden access, getting refresh token")
        refreshToken(e)
        return
      }
      const data = await response.json()
      //console.log(data);
      renderSinglePostComponent()
      showFormFunction()
      if (!response.ok) {
        console.error("error")
      }
    } catch (error) {
      console.error("Network error:", error)
    }
  }
  async function refreshToken(e) {
    try {
      const accessToken = await newAccessToken()
      updatePost(e, accessToken)
      setAccessToken(accessToken)
    } catch (error) {
      console.error("403-Forbidden access, must log in again")
      navigate("/")
    }
  }
  const handlePublish = () => {
    setPublish(!publish)
  }

  return (
    <div>
      {showForm && (
        <form className="newPostForm" method="post" action="http://localhost:9000/posts" onSubmit={(e) => updatePost(e, accessToken)}>
          <button type="button" className="closeFormButton" onClick={showFormFunction}>
            X
          </button>
          <div className="newPostCategory">
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="newPostCategory">
            <label htmlFor="text">Text:</label>
            <textarea name="text" id="text" value={text} onChange={(e) => setText(e.target.value)}></textarea>
          </div>
          <div className="publishDiv">
            <label htmlFor="publish">Publish:</label>
            <input type="checkbox" name="publish" id="publish" checked={publish} onChange={handlePublish} />
          </div>
          <button type="submit" className="addPostButton">
            Update post
          </button>
        </form>
      )}
    </div>
  )
}

export default UpdatePost
