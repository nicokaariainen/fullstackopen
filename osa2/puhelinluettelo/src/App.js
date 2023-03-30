import { useEffect, useState } from 'react'
import personService from './services/persons'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({text: null, isError: false})

  useEffect(() => {
    personService
      .getPersons()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  function notify(text, isError) {
    setNotification({
      ...notification,
      text: text,
      isError: isError
    })
    setTimeout(() => {
      setNotification({
        ...notification,
        text: null,
        isError: false
      })
    }, 5000)
  }

  const editPerson = (changedPerson, newNumber) => {
    const newPerson = {...changedPerson, number: newNumber}

    personService
      .edit(changedPerson.id, newPerson)
      .then(editedPerson => {
        setPersons(persons.map(person => person.id !== editedPerson.id ? person : editedPerson))
        setNewName('')
        setNewNumber('')
      })
      .then(() => {
        notify(`Successfully edited ${changedPerson.name} in the phonebook.`, false)
      })
      .catch(error => {
        notify(`Information of ${changedPerson.name} has already been removed from server.`, true)
        setPersons(persons.filter(person => person.id !== changedPerson.id))
        setNewName('')
        setNewNumber('')
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name.toLowerCase() === newName.trim().toLowerCase())) {
      if (window.confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`)) {
        editPerson(persons.find(person => person.name.trim().toLowerCase() === newName.trim().toLowerCase()), newNumber.trim())
      }
      return
    }

    const personObj = {
      name: newName.trim(),
      number: newNumber.trim()
    }

    personService
      .create(personObj)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
      .then(() => {
        notify(`Successfully added ${personObj.name} to the phonebook.`, false)
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .then(() => {
          notify(`Successfully deleted ${person.name} from the phonebook.`, false)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification text={notification.text} isError={notification.isError} />
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
      
      <Numbers persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )

}

export default App