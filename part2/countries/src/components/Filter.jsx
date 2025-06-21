const Filter = ({ value, onChange}) => (
  <div>
    find country: {''}
    <input value={value} onChange={onChange} />
  </div>
)

export default Filter