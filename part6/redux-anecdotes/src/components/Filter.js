import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";
const Filter = () => {
  const dispatch = useDispatch();
  const handlerChange = (e) => {
    dispatch(filterChange(e.target.value));
  };
  const style = {
    marginBottom: "30px",
  };
  return (
    <div style={style}>
      filter: <input onChange={handlerChange} name="filter" />
    </div>
  );
};

export default Filter;
