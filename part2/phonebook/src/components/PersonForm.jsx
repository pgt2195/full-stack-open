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

export default PersonForm