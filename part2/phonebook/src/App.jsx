import { useState, useEffect } from 'react'
import personService from './services/personService'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setNewPersons] = useState([])

  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)

  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const [filterValue, setFilterValue] = useState('')
  const handleFilterChange = (event) => setFilterValue(event.target.value)

  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const removePerson = id => {
    console.log('deleting id', id)
    const person = persons.find(n => n.id === id)

    const confirmed = window.confirm(`Delete ${person.name} ?`)

    if (!confirmed) {
      return
    }

    personService.remove(id)
      .then(() => {
        setNewPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert(`${person.name} was already deleted`)
        setNewPersons(persons.filter(person => person.id !== id))
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    const exists = persons.some(person => person.name === newName)

    if (exists) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)

      if (confirmed) {
        const personToUpdate = persons.find(n => n.name === newName)
        const updatedPersonObj = { ...personToUpdate, number: newNumber }
        personService.update(personToUpdate.id, updatedPersonObj)
          .then(response => {
            setNewPersons(persons.map(person => person.id !== personToUpdate.id ? person : response))
            setNotification(`Updated ${response.name}`)
            console.log('notification now', notification)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(() => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewPersons(persons.filter(person => person.id !== personToUpdate.id))
          })
      }

      resetForm()
      return
    }

    const personObject = { name: newName, number: newNumber }
    personService.create(personObject).then(returnedPerson => {
      setNewPersons(persons.concat(returnedPerson))
      setNotification(`Added ${returnedPerson.name}`)
      console.log('notification now', notification)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      resetForm()
    })
  }

  const hook = () => {
    console.log('hook')
    personService.getAll().then(initialPersons => setNewPersons(initialPersons))
  }

  useEffect(hook, [])

  const personsToShow = !filterValue ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className="update" message={notification} />
      <Notification className="error" message={errorMessage} />
      <Filter changeHandler={handleFilterChange} currentValue={filterValue} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        nameHandler={handleNameChange}
        number={newNumber}
        numberHandler={handleNumberChange}
        submitHandler={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteFunc={removePerson}/>
    </div>
  )
}

export default App
