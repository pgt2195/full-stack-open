const Filter = ({ value, onChange}) => (
  <div>
    Search for a contact: {''}
    <input value={value} onChange={onChange} />
  </div>
)

export default Filter