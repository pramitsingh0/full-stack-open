import { useState } from "react";
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
const Display = ({ persons, filter }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          );
        }
      })}
    </div>
  );
};
const FilterForm = ( { filter, changeHandle}) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={changeHandle} />
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const nameChangeHandler = (e) => {
    setNewName(e.target.value);
  };
  const numberChangeHandler = (e) => {
    setNewNumber(e.target.value);
  };
  const filterChangeHandler = (e) => {
    setFilter(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const dupFound = persons.find((person) => person.name === newName);
    if (dupFound) {
      return alert(`${newName} already added to the phonebook`);
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <FilterForm filter={filter} changeHandle={filterChangeHandler} />
      <Header />
      <ContactForm
        submitHandler={submitHandler}
        nameChangeHandle={nameChangeHandler}
        numberChangeHandle={numberChangeHandler}
        name={newName}
        number={newNumber}
      />
      <Display persons={persons} filter={filter} />
    </div>
  );
};
export default App;
