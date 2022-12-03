import {useState} from "react";
import {Link} from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const requestData = JSON.stringify({title, content, password});
    const headers = {"content-type": "application/json"};

    fetch('http://localhost:3000/blog/create-post', {
      method: 'POST',
      body: requestData, 
      headers: headers
    }).then(res => {
      if (res.status == 400) return alert('Please fill out both fields');
      if (res.status == 401) return alert('Wrong password, please enter the correct password');
      setDone(true);
    }).catch(()=> alert("An error has occured"));
    setDone(false);

    console.log(requestData);
  }
  if (done) {
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <div>
      <h1>Enter Blog Post Details</h1>
      <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <div>
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
        />
      </div>
      <button>Post</button>
    </form>
    </div>
  );
}
