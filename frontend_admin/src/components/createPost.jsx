import { useState } from "react";

function CreatePost({ showForm, showFormFunction, userId, renderPostsComponent }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [publish, setPublish] = useState(false);

  async function createPost(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, text, publish, userId }),
      });
      const data = await response.json();
      console.log(data);
      renderPostsComponent();
      showFormFunction();
      setText("");
      setTitle("");
      setPublish(false);

      if (!response.ok) {
        console.error("error");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  const handlePublish = () => {
    setPublish(!publish);
  };

  return (
    <div>
      {showForm && (
        <form
          className="newPostForm"
          method="post"
          action="http://localhost:9000/posts"
          onSubmit={createPost}
        >
          <button type="button" className="closeFormButton" onClick={showFormFunction}>
            X
          </button>
          <div className="newPostCategory">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="newPostCategory">
            <label htmlFor="text">Text:</label>
            <textarea
              name="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className="publishDiv">
            <label htmlFor="publish">Publish:</label>
            <input
              type="checkbox"
              name="publish"
              id="publish"
              checked={publish}
              onChange={handlePublish}
            />
          </div>
          <button type="submit" className="addPostButton">
            Add post
          </button>
        </form>
      )}
    </div>
  );
}

export default CreatePost;
