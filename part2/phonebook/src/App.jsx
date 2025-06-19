import { useState, useEffect } from "react";
import axios from 'axios'

const Filter = ({ value, onChange}) => (
  <div>
    Search for a contact: {''}
    <input value={value} onChange={onChange} />
  </div>
)

const PersonForm = ({ onSubmit, newName, newPhone, nameChange, phoneChange}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={nameChange} /> <br />
      number: <input value={newPhone} onChange={phoneChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons }) => (
  <>
    {persons.map((person) => <Entry key={person.id} person={person} /> )}
  </>
)

const Entry = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios 
      .get('http://192.168.1.31:3001/persons')
      .then(response => (
        setPersons(response.data)
      ))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneChange = (event) => setNewPhone(event.target.value);
  const handleSearchChange = (event) => {
    const searchValue = event.target.value
    setNewSearch(searchValue);
    searchValue ? setShowAll(false) : setShowAll(true)
    // console.log(searchValue)
  };

  const addEntry = (event) => {
    event.preventDefault();
    const addedEntry = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };
    if (!persons.find((i) => i.name === addedEntry.name)) {
      setPersons(persons.concat(addedEntry));
    } else {
      alert(`${addedEntry.name} is already added to the phonebook`);
    }
  };

  const contactsToShow = showAll
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()));


  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter 
        value={ newSearch } 
        onChange={ handleSearchChange } 
      />

      <h2>Add a new entry</h2>

      <PersonForm 
        onSubmit={addEntry}
        newName={newName}
        newPhone={newPhone}
        nameChange={handleNameChange}
        phoneChange={handlePhoneChange}
      />

      <h2>Numbers</h2>
      
      <Persons persons={contactsToShow} />

    </div>
  );
};

export default App;
