import { useState } from 'react'

const Entry = ({ name }) => <li>{name}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = event => setNewName(event.target.value)
  const addName = (event) => {
    event.preventDefault()
    const addedName = { name: newName }
    if (!persons.find(i => i.name === addedName.name)) {    
      setPersons(persons.concat(addedName))
    } else {
      alert(`${addedName.name} is already added to the phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Entry key={person.name} name={person.name} />)}
      </ul>
    </div>
  )
}

export default App