import { useState } from "react";
const NewBlog = ({
  submitHandler,
  blogTitle,
  setBlogTitle,
  blogAuthor,
  setBlogAuthor,
  blogUrl,
  setBlogUrl,
}) => {
  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={submitHandler}>
        <div>
          title:
          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogAuthor}
            onChange={(e) => setBlogAuthor(e.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blogUrl}
            onChange={(e) => setBlogUrl(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
export default NewBlog;
