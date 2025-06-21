const Countries = ({ countries }) => (
  <div style={{marginTop: 20}}>
    {countries.map((country) => <Entry key={country.cca3} country={country} /> )}
  </div>
)

const Entry = ({ country }) => (
  <div>
    {country.name.common}
  </div>
);

export default Countries