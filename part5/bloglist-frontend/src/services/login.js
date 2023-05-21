import axios from "axios";
const baseUrl = "http://localhost:3003/api/users";

const login = async (username, password) => {
  const response = await axios.post(`${baseUrl}/login`, {
    username,
    password,
  });
  console.log(response);
  return response.data;
};

export default login;
