import React, { useState,useEffect } from 'react'
import axios from 'axios'

/*
ohjelman käynnistys näin
($env:REACT_APP_WEATHERSTACK_API_KEY = "abcdef") -and (npm start)
*/

const Filter = (props) => {
  return (
    <div>
      Hae: <input onChange={props.handleSearchChange} />
      <hr/>
    </div>
  )
}

const Countries = (props) => {

  if(props.countriesToShow.length>10) {
    return (
      <h3>Liikaa vaihtoehtoja</h3>
    )
  }

  if(props.countriesToShow.length===1) {
    return (
      props.countriesToShow.map(country => <Country key={country.name} country={country} />)
    )
  }

  return (
    props.countriesToShow.map(country => <div>{country.name} <button onClick={() => props.setSearch(country.name)}>näytä</button></div>)
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        Pääkaupunki {country.capital}<br/>
        Asukasluku {country.population}
      </p>
      <p>
        <b>Puhutut kielet:</b><br/>
        {country.languages.map(language => <div>{language.name}</div>)}
      </p>
      <p>
        <img src={country.flag} alt="lippu" width="220" />
      </p>
      <Weather country={country} />
    </div>
  )
}

const Weather = ({country}) => {
  const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY
  const [ weather, setWeather] = useState(false) 
  const url = "http://api.weatherstack.com/current?units=m&access_key="+api_key+"&query="+country.capital
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  console.log("weather",weather)

  if(weather) {
    return (
      <div>
        <h4>Säätiedot {country.capital}</h4>
        <p>Lämpötila {weather.current.temperature} &deg;C</p>
        <p><img src={weather.current.weather_icons[0]} alt="sääkuvake" /></p>
        <p>Tuuli {weather.current.wind_dir} {weather.current.wind_speed} km/h  </p>
      </div>
    )
  } 

  return (
    <div></div>
  )

}

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ search, setSearch ] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  //console.log('render', persons.length, 'notes')
  const handleSearchChange = (event) => {
    setSearch(event.target.value) 
  }

  const countriesToShow = (search==="")
  ? []
  : countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Etsi maista</h2>
      <Filter handleSearchChange={handleSearchChange} />
      <Countries setSearch={setSearch} countriesToShow={countriesToShow} />
    </div>
  )

}

export default App