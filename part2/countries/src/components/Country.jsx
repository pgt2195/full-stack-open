import { useState, useEffect } from "react";
import weatherService from "../services/meteo";
import DisplayMeteo from "./DisplayMeteo";
import DisplayCountryData from "./DisplayCountryData";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  useEffect(() => {
    weatherService
      .getMeteo(lat, lon)
      .then((JSONdata) => {
        setWeather(JSONdata)
      })
      .catch(error => console.log(`Error, something wrong happened :/ ${error}`))
  }, []);

  return (
    <>
      <DisplayCountryData country={country} />
      {weather ? <DisplayMeteo meteoData={weather} city={country.capital[0]}/> : ''}
    </>
  );
};

export default Country;
