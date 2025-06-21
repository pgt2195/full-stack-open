const DisplayCountryData = ({ country }) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h2>Language</h2>
        <ul>
          {Object.values(country.languages).map((el) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="flag" style={{ marginTop: 10 }} />
      </div>
    )
}

export default DisplayCountryData