import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const Person = ({person}) => {
    return (
      <div>{person.name}</div>
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
          <button type="submit">Lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </div>
  )

}

export default App