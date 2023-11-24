import { useEffect, useState } from "react";
import countriesServices from "./services/countries";
import Countries from "./components/Countries";
import Country from "./components/Country";
import Message from "./components/Message";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [country, setCountry] = useState({});
  const [weather, setWeather] = useState();
  const [weatherReady, setWeatherReady] = useState(false);

  const message = "Too many matches, specify another filter";

  useEffect(() => {
    countriesServices.getAll().then((returnedCountries) => {
      setCountries(returnedCountries);
    });
  }, []);

  useEffect(() => {
    if (country.capital != null) {
      setWeatherReady(false)
      countriesServices.getWeather(country.capital).then((returnedWeather) => {
        setWeather(returnedWeather);
        setWeatherReady(true)
      });
    }
  }, [country]);

  const filterByName = (event) => {
    const searchFilter = event.target.value;
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setCountriesToShow(filteredCountries);
    if(filteredCountries.length==1){
      setCountry(filteredCountries[0]);
    }
  };

  const showCountry = (event) => {
    const name = event.target.value;
    countriesServices.getOne(name).then((returnedCountry) => {
      setCountry(returnedCountry);
      setCountriesToShow([returnedCountry]);
    });
  };

  return (
    <div>
      find countries
      <input onChange={filterByName} />
      {countriesToShow.length > 10 ? (
        countriesToShow.length == countries.length ? (
          <></>
        ) : (
          <Message message={message} />
        )
      ) : countriesToShow.length != 1 ? (
        <Countries countries={countriesToShow} showCountry={showCountry} />
      ) : (
        weatherReady && <Country country={country} weather={weather} />
      )}
    </div>
  );
};

export default App;
