import { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState(null);
  const [notifType, setNotifType] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) =>
        displayNotification(`Something went wrong, can't reach server`, "bad")
      );
  }, []);

  const contactsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      );

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneChange = (event) => setNewPhone(event.target.value);
  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setNewSearch(searchValue);
    searchValue ? setShowAll(false) : setShowAll(true);
  };

  const clearForm = () => {
    setNewName("");
    setNewPhone("");
  };

  const displayNotification = (message, type = "good") => {
    setNotifType(type);
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
    console.log(message);
  };

  const addEntry = (event) => {
    event.preventDefault();
    const addedEntry = {
      name: newName,
      number: newPhone,
    };

    /*
      The 'personExists' trick only works when the app is open
      in a single browser. If we open it in two browsers, add an entry
      in one, and the same in the other, two identical entries
      will be added to the database (only a different ID). Since handling this case
      isn't required for the assignment, I decided not to spend time on it.
    */
    const personExists = persons.find((i) => i.name === addedEntry.name);
    if (!personExists) {
      personService
        .create(addedEntry)
        .then((returnedEntry) => {
          setPersons(persons.concat(returnedEntry));
          clearForm();
          displayNotification(`${returnedEntry.name} has been added!`);
        })
        .catch((error) => {
          displayNotification(`${error.response.data.error}`, "bad");
        });
    } else {
      const message = `${addedEntry.name} is already added to the phonebook, do you want to update the number ?`;
      if (confirm(message)) {
        toggleChangeNumber(personExists, addedEntry.number);
        console.log(`${personExists}\n${typeof personExists}`);
      }
    }
  };

  const toggleDelete = (entry) => {
    if (confirm(`Do you want to delete ${entry.name}`)) {
      personService
        .deleteEntry(entry.id)
        .then((deletedEntry) => {
          // console.log(typeof deletedEntry)
          // console.log(deletedEntry)
          setPersons(persons.filter((n) => n.id !== deletedEntry.id));
          displayNotification(`${entry.name} has been deleted!`);
        })
        .catch((error) =>
          displayNotification(
            `Something went wrong, can't find ${entry.name} on the server`,
            "bad"
          )
        );
    }
  };

  const toggleChangeNumber = (person, newNumber) => {
    const changedPerson = { ...person, number: newNumber };
    personService
      .update(person.id, changedPerson)
      .then((returnedEntry) => {
        setPersons(
          persons.map((n) => (n.id !== person.id ? n : returnedEntry))
        );
        clearForm();
        displayNotification(`${person.name} has been updated!`);
      })
      .catch((error) =>
        displayNotification(
          `Something went wrong, can't find ${person.name} on the server`,
          "bad"
        )
      );
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newSearch} onChange={handleSearchChange} />

      <h2>Add a new entry</h2>

      <PersonForm
        onSubmit={addEntry}
        newName={newName}
        newPhone={newPhone}
        nameChange={handleNameChange}
        phoneChange={handlePhoneChange}
      />

      <Notification message={notification} type={notifType} />

      <h2>Numbers</h2>

      <Persons persons={contactsToShow} toggleDelete={toggleDelete} />
    </div>
  );
};

export default App;
