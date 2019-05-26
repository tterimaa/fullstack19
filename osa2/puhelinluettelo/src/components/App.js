import React, { useState, useEffect } from 'react'
import Numbers from './Numbers'
import PersonForm from './PersonForm'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then((response) => {
        setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(p => p.name).includes(newName)) {
        alert(`${newName} on jo luettelossa`)
    } else {
        const personObject = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <PersonForm submit={addPerson} nameValue={newName} nameHandler={handleNameChange} numberValue={newNumber} numberHandler={handleNumberChange} />   
      <h2>Numerot</h2>
      <Numbers persons={persons} />
    </div>
  )

}

export default App