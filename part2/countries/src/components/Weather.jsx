const Weather = ({weather}) => {
    return (
        <>
            <h2>Weather in {weather.name}</h2>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <p>wind {weather.wind.speed} m/s</p>
        </>
    )
}

export default Weather