import { wait } from "@testing-library/user-event/dist/utils";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      let x = a[key];
      let y = b[key];
      if (x < y) return 1;
      else if (x > y) return -1;
      else return 0;
    });
  }
  const anecdotes = useSelector((state) => sortByKey(state, "votes"));
  const dispatch = useDispatch();

  const vote = (id) => {
    const action = {
      type: "VOTE",
      payload: {
        id,
      },
    };
    dispatch(action);
  };
  const createNew = (e) => {
    e.preventDefault();
    const content = e.target.newAnecdote.value;
    const action = {
      type: "CREATE",
      payload: {
        content,
      },
    };
    e.target.newAnecdote.value = "";
    dispatch(action);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
