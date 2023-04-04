import { useState } from "react";
const Header = () => <h2>Phonebook</h2>;
const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const changeHandler = (e) => {
    setNewName(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const dupFound = persons.find(person => person.name === newName);
    if (dupFound) {
      return alert(`${newName} already added to the phonebook`);
    }
    setPersons([...persons, { name: newName }]);
    setNewName("");
  };

  return (
    <div>
      <Header />
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={changeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};
export default App;
