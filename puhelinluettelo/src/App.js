import React, { useState,useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      Hae: <input onChange={props.handleSearchChange} />
    </div>
  )
}

const Persons = ({personsToShow}) => {
  return (
    personsToShow.map(person => <Person key={person.name} person={person} />)
  )
}
const Person = ({person}) => {
  return (
    <div>{person.name} {person.phone}</div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}> 
      <div>
        Nimi: <input onChange={props.handleChange} />
      </div>
      <div>
        Puhelinnumero: <input onChange={props.handlePhoneChange} />
      </div>
      <div>
        <button type="submit">Lisää</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  //console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
    event.preventDefault()

    let val = newName.toLowerCase();
    let matches = persons.filter(test => test.name.toLowerCase().includes(val));
    if(matches.length>0) {
      alert(`${newName} on jo lisätty puhelinluetteloon`)
    } else {
      const personObject = {
        name: newName,
        phone: newPhone
      }
      
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
      })

    }
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value) 
  }

  const personsToShow = (search==="")
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <PersonForm addPerson={addPerson} handleChange={handleChange} handlePhoneChange={handlePhoneChange} />
      <h2>Numerot</h2>
      <Filter handleSearchChange={handleSearchChange} />
      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App