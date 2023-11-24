const Countries = ({countries,showCountry}) => {
        return (
            <>
                {countries.map(country => <div key={country.name.common}>{country.name.common}<button value={country.name.common} onClick={showCountry}>show</button></div>)}
            </>
        )

}

export default Countries