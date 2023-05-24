import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};
const createNew = async (blog, creator) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${creator.token}`,
      },
    };
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

const likeBlog = async (blog) => {
  try {
    const updatedBlog = await axios.put(`${baseUrl}/${blog.id}`, blog);
    return updatedBlog.data;
  } catch (e) {
    console.log(e);
    throw new Error("Error in updating blog");
  }
};

const deleteBlog = async (blogId, user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const resp = await axios.delete(`${baseUrl}/${blogId}`, config);
    return resp.status;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, setToken, likeBlog, deleteBlog };
