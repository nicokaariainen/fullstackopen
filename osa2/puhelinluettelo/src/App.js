import { useState } from 'react'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name.toLowerCase() === newName.trim().toLowerCase())) {
      alert(`${newName.trim()} is already added to phonebook`)
      return
    }

    const personObj = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1
    }
    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter}/>

      <h2>Add a new person</h2>

      <NewPersonForm 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber} 
        addPerson={addPerson} 
      />

      <h2>Numbers</h2>
      
      <Numbers persons={persons} filter={filter}/>
    </div>
  )

}

export default App