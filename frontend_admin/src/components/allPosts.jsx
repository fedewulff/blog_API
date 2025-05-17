import { useState, useEffect } from "react";
import { NavLink } from "react-router";

function AllPosts({ renderPosts, eraseAccessToken }) {
  const [postsArray, setPostsArray] = useState([]);
  const [error, setError] = useState(``);
  const [loading, setLoading] = useState(true);

  async function getAllPosts() {
    try {
      const response = await fetch("http://localhost:9000/posts", {
        headers: {
          "Content-Type": "application/json",
        },

        //credentials: "include",
      });
      const data = await response.json();
      setPostsArray(data.posts);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllPosts();
  }, [renderPosts]);

  if (error) {
    return <div>Couldn't fetch API</div>;
  }
  if (loading) {
    return <div>Loading . . .</div>;
  }

  if (!postsArray) return;

  return (
    <div>
      <h1 className="postsTitle">POSTS</h1>
      <div className="grid">
        {postsArray.map((post) => {
          return (
            <NavLink to={`/admin-profile/post/${post.id}`} className="gridPost" key={post.id}>
              <div className="gridPostYellow ">
                {post.title.length >= 60 && (
                  <h2 className="gridPostTitle">{post.title.slice(0, 50)}...</h2>
                )}
                {post.title.length < 60 && <h2 className="gridPostTitle">{post.title}</h2>}
                <div className="createdAtAndPublic">
                  <div className="gridPostCreatedAt">{post.createdAt}</div>
                  {post.public && <div className="public">PUBLIC</div>}
                  {!post.public && <div className="notPublic">NOT PUBLIC</div>}
                </div>
              </div>
              {post.text.length >= 200 && (
                <div className="gridPostText">{post.text.slice(0, 200)}...</div>
              )}
              {post.text.length < 200 && <div className="gridPostText">{post.text}</div>}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default AllPosts;
