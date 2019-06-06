import React, { useState, useEffect } from 'react'
import Numbers from './Numbers'
import PersonForm from './PersonForm'
import personsService from '../services/persons'
import Notification from './notification'
import Filter from './filter'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState({
    text: "some text",
    type: "some type"
  })

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeletePerson = (i,name) => {
    if(!window.confirm(`do you want to delete ${name}`)) return;
    personsService.deletePerson(i)
    setPersons(persons.filter(person => person.id !== i))
    showMessage(`${name} was succesfully removed`, "success")
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
            showMessage(`Number of ${changedPerson.name}   was succesfully changed`, "success")
          })
          .catch(error => {
            showMessage(`Information of ${newName} has been already removed from the server`, "error")
            console.log(error)
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
          showMessage(`${returnedPerson.name} was added succesfully`, "success")
        })
      }
      setNewName('')
      setNewNumber('')
    }

    const showMessage = (messageText, type) => {
      console.log(messageText, type)
      const timeOutTime = 5000;

      const newMessage = {
        text: messageText,
        type: type
      }
      const emptyMessage = {
        text: "",
        type: ""
      }
      setMessage(newMessage)
      setTimeout(() => {
        setMessage(emptyMessage)
      }, timeOutTime)
    }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification text={message.text} type={message.type} />
      <Filter changeHandler={handleFilterChange} />
      <PersonForm submit={addPerson} nameValue={newName} nameHandler={handleNameChange} numberValue={newNumber} numberHandler={handleNumberChange} />   
      <h2>Numerot</h2>
      <Numbers persons={persons} deletePerson={handleDeletePerson} filter={filter} />
    </div>
  )

}

export default App