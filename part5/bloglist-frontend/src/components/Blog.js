import { useState } from "react";
import DetailsButton from "./ViewDetailsButton";
const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisibility] = useState(true);
  const toggleVisibility = () => setDetailsVisibility(!detailsVisible);
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
          likes: {blog.likes}
          <br />
          creator: {blog.creator.name}
        </div>
      )}
    </div>
  );
};

export default Blog;
