import { useState } from "react";

const Filter = ({ value, onChange}) => (
  <div>
    Search for a contact:{" "}
    <input value={value} onChange={onChange} />
  </div>
)

const Entry = ({ person }) => (
  <div>
    {person.name} {person.phone}
  </div>
);

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneChange = (event) => setNewPhone(event.target.value);
  const handleSearchChange = (event) => {
    const searchValue = event.target.value
    setNewSearch(searchValue);
    searchValue ? setShowAll(false) : setShowAll(true)
    console.log(searchValue)
  };

  const addEntry = (event) => {
    event.preventDefault();
    const addedEntry = {
      name: newName,
      phone: newPhone,
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
