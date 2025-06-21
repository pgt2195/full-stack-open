const Countries = ({ countries, toggleCountry }) => (
  <div style={{marginTop: 20}}>
    {countries.map((country) => <Entry key={country.cca3} country={country} toggleCountry={toggleCountry}/> )}
  </div>
)

const Entry = ({ country, toggleCountry }) => (
  <div>
    {country.name.common} <button onClick={() => toggleCountry(country.name.common)}>show</button>
  </div>
);

export default Countries