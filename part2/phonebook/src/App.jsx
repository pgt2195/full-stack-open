import { useState } from 'react'

const Entry = ({ person }) => <li>{person.name} {person.phone}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = event => setNewName(event.target.value)
  const handlePhoneChange = event => setNewPhone(event.target.value)
  const addEntry = event => {
    event.preventDefault()
    const addedEntry = { name: newName, phone: newPhone }
    if (!persons.find(i => i.name === addedEntry.name)) {    
      setPersons(persons.concat(addedEntry))
    } else {
      alert(`${addedEntry.name} is already added to the phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/> <br/>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Entry key={person.name} person={person} />)}
      </ul>
    </div>
  )
}

export default App