import React, { useState, useEffect } from 'react'
import Numbers from './Numbers'
import PersonForm from './PersonForm'
import personsService from '../services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    personsService
    .getAll()
    .then(initialPersons => {
      console.log("response: ", initialPersons)
        setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleDeletePerson = (i,name) => {
    if(!window.confirm(`do you want to delete ${name}`)) return;
    personsService.deletePerson(i)
    setPersons(persons.filter(person => person.id !== i))
    console.log(persons)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(p => p.name).includes(newName)) {
        if(window.confirm("korvataanko vanha nro uudella")) {
          const person = persons.find(p => p.name === newName)
          const changedPerson = {...person, number: newNumber}
          
          personsService
          .changePerson(changedPerson, person.id)
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : response.data))
          })
        }
    } else {
        const personObject = {
            name: newName,
            number: newNumber
        }

        personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      }
      setNewName('')
      setNewNumber('')
    }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <PersonForm submit={addPerson} nameValue={newName} nameHandler={handleNameChange} numberValue={newNumber} numberHandler={handleNumberChange} />   
      <h2>Numerot</h2>
      <Numbers persons={persons} deletePerson={handleDeletePerson} />
    </div>
  )

}

export default App