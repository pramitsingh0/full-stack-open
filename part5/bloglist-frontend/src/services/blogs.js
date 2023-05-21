import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  console.log(request.data);
  return request.data;
  return request.then((resp) => resp.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };
