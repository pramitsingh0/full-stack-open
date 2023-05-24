import { useState } from "react";
import DetailsButton from "./ViewDetailsButton";
import LikeButton from "./LikeButton";
import blogServices from "../services/blogs";
import DeleteBlogButton from "./DeleteBlogButton";

const Blog = ({ blog, deleteHandler, user }) => {
  const [detailsVisible, setDetailsVisibility] = useState(false);
  const [blogLikes, setBlogLikes] = useState(blog.likes);
  const toggleVisibility = () => setDetailsVisibility(!detailsVisible);
  const likeHandler = async () => {
    let newBlog = { ...blog, likes: blogLikes + 1 };
    const resp = await blogServices.likeBlog(newBlog);
    setBlogLikes(resp.likes);
  };
  return (
    <div style={{ margin: "10px 0px" }}>
      {blog.title} {blog.author}{" "}
      <DetailsButton
        buttonLabel={detailsVisible ? "Hide" : "View"}
        clickHandler={toggleVisibility}
      />
      {detailsVisible && (
        <div>
          author: {blog.author}
          <br />
          url: {blog.url}
          <br />
          likes: {blogLikes}
          <LikeButton clickHandler={likeHandler} />
          <br />
          creator: {blog.creator.name}
          <br />
          <DeleteBlogButton clickHandler={deleteHandler} />
        </div>
      )}
    </div>
  );
};

export default Blog;
