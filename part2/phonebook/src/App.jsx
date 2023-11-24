import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personServices from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect( () => {
    personServices.getAll().then(
      initialPersons => {
        setPersons(initialPersons) 
        setPersonsToShow(initialPersons)
      }
    )
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterByName = (event) => {
    setFilter(event.target.value)
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
  }
  const addPerson = (event) => {
    event.preventDefault()
    const personExists = persons.filter(person => person.name===newName).length===0 ? false : true 
    if (personExists) {
      const person = persons.find(person => person.name===newName)
      const id = person.id
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const changedObject = {
          ...person, number: newNumber
        }
        personServices.update(changedObject,id).then(
          returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson ))
            setPersonsToShow(persons.map(person => person.id !== id ? person : returnedPerson ))
            setNotificationMessage(`Replaced ${returnedPerson.name}'s number`)
            setTimeout(()=>{
              setNotificationMessage(null)
            },5000)
          }
        )
        .catch(
          error => {
            setPersons(persons.filter(person => person.id !== id))
            setPersonsToShow(persons.filter(person => person.id !== id))
            setNotificationMessage(`Information of ${person.name} has already been removed from server`)
          }
        )
      }
    }
    else { 
      const personObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1
      }
      personServices.create(personObject).then(
        returnedObject => {
          setPersons(persons.concat(returnedObject))
          setPersonsToShow(persons.concat(returnedObject))
          setNotificationMessage(`Added ${returnedObject.name}`)
          setTimeout(()=>{
            setNotificationMessage(null)
          },5000)
        }
      )
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name} ?`)){
      personServices.remove(id).then( response => {
        setPersons(persons.filter(person => person.id !== id))
        setPersonsToShow(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter filter={filter} filterByName={filterByName}/>
      <h2>Add a new</h2>
      <PersonForm 
        addPerson = {addPerson}
        newName = {newName}
        newNumber = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App