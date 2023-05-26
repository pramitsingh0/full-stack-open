import axios from "axios";

const baseUrl = "http://localhost:3001/";

const fetchAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const saveNote = async (anecdote) => {
  const object = { content: anecdote, votes: 0 };
  const response = await axios.post(baseUrl + "/anecdotes", object);
  return response.data;
};

export { fetchAll, saveNote };
