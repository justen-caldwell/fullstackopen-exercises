import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)

  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const [filterValue, setFilterValue] = useState('')
  const handleFilterChange = (event) => setFilterValue(event.target.value)

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const addContact = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      console.log('name already in array', newName)
      alert(`${newName} is already added to phonebook`)
      resetForm()
      return
    }

    const personObject = { name: newName, number: newNumber }
    setPersons(persons.concat(personObject))
    resetForm()
  }

  const personsToShow = !filterValue ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeHandler={handleFilterChange} currentValue={filterValue} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        nameHandler={handleNameChange}
        number={newNumber}
        numberHandler={handleNumberChange}
        submitHandler={addContact}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
