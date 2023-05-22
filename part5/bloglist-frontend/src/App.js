import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import login from "./services/login";
import LogoutButton from "./components/LogoutButton";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [message, setMessage] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await login(username, password);
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      setMessage(`User ${loggedUser.name} logged in`);
    } catch (e) {
      setMessage("Invalid Credentials");
    }
    setUsername("");
    setPassword("");
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const blogSubmit = async (e) => {
    e.preventDefault();
    const createdBlog = await blogService.createNew(
      {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      },
      user
    );
    setBlogs([...blogs, createdBlog]);
    setBlogUrl("");
    setBlogAuthor("");
    setBlogTitle("");
    setMessage(
      `A new blog ${createdBlog.title} by ${createdBlog.author} added`
    );
  };

  //Fetch all users on first render
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // Fetch logged in user from local storage
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);
  useEffect(() => {
    const timedOp = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timedOp);
  }, [message]);
  if (user === null) {
    return (
      <>
        <Notification message={message} />
        <LoginForm
          submitHandler={loginHandler}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p> <LogoutButton clickHandler={logoutHandler} />
      <Notification message={message} />
      <NewBlog
        submitHandler={blogSubmit}
        blogTitle={blogTitle}
        setBlogTitle={setBlogTitle}
        blogAuthor={blogAuthor}
        setBlogAuthor={setBlogAuthor}
        blogUrl={blogUrl}
        setBlogUrl={setBlogUrl}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
