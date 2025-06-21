import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Country from "./components/Country";

const App = () => {
  /* State variables */
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(null);

  /* Loading countries on initial render */
  useEffect(() => {
    console.log("Loading countries...");
    countryService
      .getAll()
      .then((data) => {
        data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        setCountries(data)
        console.log("All countries loaded")
      })
      .catch(error => console.log(`Error, something happened: ${error}`))
  }, []);

  /* Handling search features */
  // Filter countries based on search input 
  const countriesToShow = show 
    ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : []

  // Update search state and toggle results visibility
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    searchValue ? setShow(true) : setShow(null)
  };

  // Decide what to render based on the number of matching countries
  const toRender = () => {
    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter please</p>
    } else if (countriesToShow.length === 1) {
      return <Country country={countriesToShow[0]} />
    } else {
      return <Countries countries={countriesToShow} />
    }
  }

  /* Rendering the main UI */
  return (
    <div>
      <Filter value={search} onChange={handleSearch} />
      
      {toRender()}

    </div>
  );
};

export default App;
