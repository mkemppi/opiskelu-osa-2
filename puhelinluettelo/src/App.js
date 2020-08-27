import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phone: '4878484848' 
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
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
      {persons.map(person => <Person key={person.name} person={person} />)}
    </div>
  )

}

export default App