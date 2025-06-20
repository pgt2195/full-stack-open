import { useState, useEffect } from "react"
import noteService from './services/persons'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => (
        setPersons(initialPersons)
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
    };
    if (!persons.find((i) => i.name === addedEntry.name)) {
      noteService
        .create(addedEntry)
        .then(returnedEntry => {
          setPersons(persons.concat(returnedEntry))
          setNewName('')
          setNewPhone('')
        })
    } else {
      alert(`${addedEntry.name} is already added to the phonebook`);
    }
  };

  const toggleDelete = (entry) => {
    if (confirm(`Do you want to delete ${entry.name}`)) {
      noteService
        .deleteEntry(entry.id)
        .then(deletedEntry => {
          setPersons(persons.filter(n => n.id !== deletedEntry.id))
          console.log('deleted!')
        })
        .catch(error => console.log('Nope!'))
    }
  }

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
      
      <Persons persons={contactsToShow} toggleDelete={toggleDelete} />

    </div>
  );
};

export default App;
