import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' },
    { name: 'Mikko Kemppi', phone: '1212121' },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ search, setSearch ] = useState('')

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
      
      setPersons(persons.concat(personObject))
      setNewName('')
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

  const Person = ({person}) => {
    return (
      <div>{person.name} {person.phone}</div>
    )
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}> 
        <div>
          Nimi: <input onChange={handleChange} />
        </div>
        <div>
          Puhelinnumero: <input onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <div>
        Hae: <input onChange={handleSearchChange} />
      </div>
      {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </div>
  )

}

export default App