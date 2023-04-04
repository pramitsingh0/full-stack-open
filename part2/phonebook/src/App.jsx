import { useState } from "react";
const Header = () => <h2>Phonebook</h2>;
const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const nameChangeHandler = (e) => {
    setNewName(e.target.value);
  };
  const numberChangeHandler = (e) => {
    setNewNumber(e.target.value);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    const dupFound = persons.find(person => person.name === newName);
    if (dupFound) {
      return alert(`${newName} already added to the phonebook`);
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <Header />
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={nameChangeHandler} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </div>
  );
};
export default App;
