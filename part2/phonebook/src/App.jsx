import { useEffect, useState } from "react";
import axios from "axios";
import helpers from "./services/dbConnect";
const Header = () => <h2>Phonebook</h2>;
const Input = ({ text, value, changeHandle }) => {
  return (
    <div>
      {text}: <input value={value} onChange={changeHandle} />
    </div>
  );
};
const SubmitBtn = () => (
  <div>
    <button type="submit">Add</button>
  </div>
);
const DeleteBtn = ({ clickHandle }) => (
  <button type="button" onClick={clickHandle}>
    Delete
  </button>
);
const Notification = ({ message }) => {
  if (message === "") return null;
  console.log(message);
  const isError = message.includes("Error");
  const notifyStyles = {
    color: isError ? "red" : "green",
    border: "5px solid",
    background: "lightgrey",
    padding: 10,
    marginBottom: 10,
    fontSize: 20,
    borderRadius: 5,
  };
  const [showElement, setShowElement] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
      console.log("repeated");
    }, 3000);
  }, []);
  return showElement ? <div style={notifyStyles}>{message}</div> : <></>;
};
const ContactForm = ({
  submitHandler,
  nameChangeHandle,
  numberChangeHandle,
  name,
  number,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <Input text="name" value={name} changeHandle={nameChangeHandle} />
      <Input text="number" value={number} changeHandle={numberChangeHandle} />
      <SubmitBtn />
    </form>
  );
};
const Display = ({ persons, filter, deletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <p key={person.name}>
              {person.name} {person.number}
              <DeleteBtn clickHandle={deletePerson(person.id)} />
            </p>
          );
        }
      })}
    </div>
  );
};
const FilterForm = ({ filter, changeHandle }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={changeHandle} />
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const nameChangeHandler = (e) => {
    setNewName(e.target.value);
  };
  const numberChangeHandler = (e) => {
    setNewNumber(e.target.value);
  };
  const filterChangeHandler = (e) => {
    setFilter(e.target.value);
  };
  const getAll = () => {
    helpers.getAllPersons().then((data) => setPersons(data));
  };
  useEffect(getAll, []);
  const deletePerson = (id) => () => {
    const person = persons.find((person) => person.id == id);
    if (person && window.confirm(`Delete ${person.name}`))
      axios
        .delete(`http://localhost:3001/api/persons/${id}`)
        .then(getAll)
        .then(() => setMessage(`Deleted ${person.name}`))
        .catch((e) => console.log('Error', e));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const dupFound = persons.find((person) => person.name === newName);
    if (dupFound) {
      console.log("dup found");
      if (window.confirm(`${newName} already added to the phonebook`)) {
        axios
          .put(`http://localhost:3001/api/persons/${dupFound.id}`, {
            ...dupFound,
            number: newNumber,
          })
          .then(getAll)
          .then(() => setMessage(`Updated ${newName}`))
          .catch((e) => {
            console.log(e)
            setMessage(
              `Error! Information of ${newName} has already been removed from the server`
            );
            setNewName("");
            setNewNumber("");
          });
        return;
      }
    }
    const newPerson = { name: newName, number: newNumber };
    helpers
      .createNewPerson(newPerson)
      .then((data) => {
        console.log(data);
        setPersons([...persons, data]);
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${newName}`);
      })
      .catch(e => {
        console.log(e.response.data.error);
        setMessage("Error " + e.response.data.error);
      });
  };

  return (
    <div>
      <FilterForm filter={filter} changeHandle={filterChangeHandler} />
      <Header />
      <Notification message={message} />
      <ContactForm
        submitHandler={submitHandler}
        nameChangeHandle={nameChangeHandler}
        numberChangeHandle={numberChangeHandler}
        name={newName}
        number={newNumber}
      />
      <Display persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
