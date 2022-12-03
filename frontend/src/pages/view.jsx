import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export function View() {
  const [posts, setPosts] = useState([]);
  const [editingTitle, setEditingTitle] = useState(null);

  useEffect(() => {
    (async function () {
      const req = await fetch("http://localhost:3000/blog/");
      const json = await req.json();
      setPosts(json);
    })();
  }, []);

  async function deletePost(title){
    const req = await fetch('http://localhost:3000/blog/delete-post', {
      method: 'POST',
      body: JSON.stringify({title}),
      headers: {
        "content-type": "application/json"
      }
    });
    const json = await req.json();
    setPosts(json)
  }

  return (
    <div>
      <Link to="/"> Home</Link>
      <h1 style={{textAlign: "center"}}>My Blogs</h1>
      <div>
        {posts.map((post) => (
          <div
            key = {post.title}
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <h2 style={{margin: "0.2rem"}}>{post.title}</h2>
            <div>{post.content}</div>
            <div>
              <button onClick={() => {
                deletePost(post.title);
              }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
