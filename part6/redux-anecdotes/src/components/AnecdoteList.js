import { useDispatch, useSelector } from "react-redux";
import { voteBlog } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
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
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteBlog(id));
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
