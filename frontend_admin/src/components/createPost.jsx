import { useState, useRef } from "react"
import newAccessToken from "../functions/refreshToken"

function CreatePost({ accessToken, setAccessToken, showForm, showFormFunction, renderPostsComponent }) {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [publish, setPublish] = useState(false)
  // const numberOfTimesRendered = useRef(0)
  // numberOfTimesRendered.current += 1
  // console.log(numberOfTimesRendered)
  console.log("createPost: ", accessToken)
  async function createPost(e, value) {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:9000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
        body: JSON.stringify({ title, text, publish }),
      })
      if (response.status === 403) {
        console.error("403-Forbidden access, getting refresh token")
        refreshToken(e)
        return
      }
      const data = await response.json()
      console.log(data)
      renderPostsComponent() //actualiza todos los post con el post que recien cree
      showFormFunction() //desaparece el form
      setText("")
      setTitle("")
      setPublish(false)

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
      createPost(e, accessToken)
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
        <form className="newPostForm" method="post" action="http://localhost:9000/posts" onSubmit={(e) => createPost(e, accessToken)}>
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
            Add post
          </button>
        </form>
      )}
    </div>
  )
}

export default CreatePost
