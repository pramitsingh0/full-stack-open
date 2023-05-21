import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import login from "./services/login";
import LogoutButton from "./components/LogoutButton";
import LoginButton from "./components/LogoutButton";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const loginHandler = async (e) => {
    e.preventDefault();
    const loggedUser = await login(username, password);
    window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    setUser(loggedUser);
    setUsername("");
    setPassword("");
  };
  const logoutHandler = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
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
  if (user === null) {
    return (
      <LoginForm
        submitHandler={loginHandler}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p> <LoginButton clickHandler={logoutHandler} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
