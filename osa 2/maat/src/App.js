import {useState, useEffect} from 'react'
import axios from 'axios'


const Filter = ({handleFilter}) => {
  return (
    <div>
      <form>
        <input onChange={handleFilter}></input>
      </form>
    </div>
  )
}


const ShowBtwn = ({index, setShowOne}) => {
  return (
    <div>
      <form onSubmit={event => event.preventDefault()}>
        <button type='button' onClick={() => {return setShowOne(index)}}>show</button>
      </form>
    </div>
  )
}

const CountryView = ({country, weather}) => {
  return (
  <>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <p><b>languages:</b></p>
    <ul>
      {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
    </ul>
    <img src={country.flags.png} alt="country flag"></img>
    <h2>
      Weather in {country.capital}
    </h2>
    <p>temperature  {weather?.currentConditions?.temp ?? 'loading'} Celcius</p>
    <p>wind {weather?.currentConditions?.windspeed ?? 'loading'} km/h</p>
  </>
)
}

const AllCountriesView = ({country, setShowOne, index}) => {
  return (
    <>
    <p>{country.name.common}</p>
    <ShowBtwn index={index} setShowOne={setShowOne} />
    </>
  )
}

const DisplayCountries = ({filter, countries, showOne, setShowOne, GetWeather, weather}) => {
  if (filter) {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

    if (filteredCountries.length > 10) return (<><p>2 many matches, specify another filter</p></>)

    else if (1 === filteredCountries.length) {
      const country = filteredCountries[0]
      GetWeather(country)
     return (
     <div>
      <CountryView country={country} weather={weather} />
    </div>
    )
  }

    else if (typeof showOne === 'number') {
      GetWeather(filteredCountries[showOne])
      return(
        <div>
          <CountryView country={filteredCountries[showOne]} weather={weather} />
        </div>
    )
  } 

    else if (1 < filteredCountries.length && filteredCountries.length <= 10) {
      return (
        <div>
        {filteredCountries.map((country, index) =>  {
          return (
           <AllCountriesView key={country.name.common} country={country} setShowOne={setShowOne}  index={index}/>) })}
        </div>
      )
    }     
  }
}



function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showOne, setShowOne] = useState(null)
  const [weather , setWeather] = useState({})


  const handleFilter = event => {
    setFilter(event.target.value)
    setShowOne(null)
    setWeather({})
  }

  function GetWeather(country) {
    const hook = () => {axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices` +
    `/rest/services/timeline/${country.capital}/${Math.floor(Date.now() / 1000)}?unitGroup=metric&key=${process.env.REACT_APP_API_KEY}&include=current`)
    .then(response => {
      setWeather(response.data)
    }
    )
  }
    useEffect(hook, [])
  }


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div className="App">
      <Filter handleFilter={handleFilter} />
      <DisplayCountries filter={filter} countries={countries} setShowOne={setShowOne} showOne={showOne} GetWeather={GetWeather} weather={weather} />
    </div>
  );
}

export default App;