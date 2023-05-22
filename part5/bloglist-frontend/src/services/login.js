import axios from "axios";
const baseUrl = "http://localhost:3003/api/users";

const login = async (username, password) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (e) {
    throw new Error("Invalid Username");
  }
};

export default login;
