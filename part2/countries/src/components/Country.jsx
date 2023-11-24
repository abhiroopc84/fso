import Weather from "./Weather"

const Country = ({country,weather}) => {
        return (
            <>
                <h1>{country.name.common}</h1>
    
                <p>capital {country.capital}<br/>area {country.area}</p>
    
                <h3>languages:</h3>
    
                <ul>
                    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png}></img>
                <Weather weather={weather}/>
            </>
        )

}

export default Country