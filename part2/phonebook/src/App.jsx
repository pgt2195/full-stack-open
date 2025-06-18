import { useState } from "react";

const Entry = ({ person }) => (
  <li>
    {person.name} {person.phone}
  </li>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);

  // Code pour gérer l'ajout d'un nouveau contact
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneChange = (event) => setNewPhone(event.target.value);
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

  // Code pour gérer la recherche dand la liste
  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value
    setNewSearch(searchValue);
    searchValue ? setShowAll(false) : setShowAll(true)
    console.log(searchValue)
  };
  const contactsToShow = showAll
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()));

  // Code qui est rendu par l'application
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search for a contact:{" "}
        <input value={newSearch} onChange={handleSearchChange} />
      </div>
      <h2>Add a new entry</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /> <br />
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {contactsToShow.map((person) => (
          <Entry key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
