const Persons = ({ persons, toggleDelete }) => (
  <>
    {persons.map((person) => <Entry key={person.id} person={person} toggleDelete={toggleDelete} /> )}
  </>
)

const Entry = ({ person, toggleDelete }) => (
  <div>
    {person.name} {person.number}
    <button onClick={() => toggleDelete(person)} style={{marginLeft: '.5rem'}}>delete</button>
  </div>
);

export default Persons