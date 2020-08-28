import React, { useState,useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      Hae: <input onChange={props.handleSearchChange} />
      <hr/>
    </div>
  )
}

const Countries = ({countriesToShow}) => {

  if(countriesToShow.length>10) {
    return (
      <h3>Liikaa vaihtoehtoja</h3>
    )
  }

  if(countriesToShow.length===1) {
    return (
      countriesToShow.map(country => <Country key={country.name} country={country} />)
    )
  }

  return (
    countriesToShow.map(country => <div>{country.name}</div>)
  )
}
const Country = ({country}) => {
  console.log(country)
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
    </div>
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
      <Countries countriesToShow={countriesToShow} />
    </div>
  )

}

export default App