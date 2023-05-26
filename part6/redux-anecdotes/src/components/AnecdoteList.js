import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteBlog, setAnecdotes } from "../reducers/anecdoteReducer";
import {
  newNotification,
  resetNotification,
} from "../reducers/notificationReducer";
import { fetchAll } from "../services/anecdotes";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAll().then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);
  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      let x = a[key];
      let y = b[key];
      if (x < y) return 1;
      else if (x > y) return -1;
      else return 0;
    });
  }
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
    return sortByKey(filteredAnecdotes, "votes");
  });

  const vote = (id) => {
    dispatch(voteBlog(id));
    const anecdoteContent = anecdotes.find(
      (anecdote) => anecdote.id === id
    ).content;
    dispatch(newNotification(`You voted ${anecdoteContent}`));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AnecdoteList;
