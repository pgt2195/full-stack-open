const DisplayMeteo = ({ meteoData, city }) => {

    const GetTempInCelcius = kelvinTemp => Math.round(kelvinTemp - 273.15)

    console.log(meteoData)

    return (
        <div>
            <h2>Weather in {city}</h2>
            <div>Temperature: {GetTempInCelcius(meteoData.main.temp)}°C</div>
            <div>
                Min: {GetTempInCelcius(meteoData.main.temp_min) + '°C '} 
                Max: {GetTempInCelcius(meteoData.main.temp_max)}°C
            </div>
            <div>Wind Speed: {meteoData.wind.speed}m/s</div>
            <div>Weather:</div>
            <img src={`https://openweathermap.org/img/wn/${meteoData.weather[0].icon}@2x.png`} alt={meteoData.weather[0].description} />
        </div>
    )
}

export default DisplayMeteo