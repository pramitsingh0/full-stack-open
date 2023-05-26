import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];
const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = [];
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createBlog(state, action) {
      const newAnecdote = action.payload;
      state.push(newAnecdote);
    },
    vote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await axios.get(baseUrl);
    dispatch(setAnecdotes(response.data));
  };
};
export const createNewAnecdote = (anecdote) => {
  return async (dispatch) => {
    const object = { content: anecdote, votes: 0 };
    const response = await axios.post(baseUrl, object);
    dispatch(createBlog(response.data));
  };
};
export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const object = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, object);
    dispatch(vote(response.data.id));
  };
};
export const { createBlog, vote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
