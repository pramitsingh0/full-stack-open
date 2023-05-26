import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/anecdoteReducer";
import { saveNote } from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createNew = async (e) => {
    e.preventDefault();
    const content = e.target.newAnecdote.value;
    e.target.newAnecdote.value = "";
    const newAnecdote = await saveNote(content);
    dispatch(createBlog(newAnecdote));
  };
  return (
    <div>
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

export default AnecdoteForm;
