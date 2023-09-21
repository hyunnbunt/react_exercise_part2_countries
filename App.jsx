import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import PersonForm from './components/Forms'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')
  let updatingPersonId = -1

  useEffect(() => {
    phonebookService
    .getAll()
    .then(initialPhonebook => {
      setPersons(initialPhonebook)
    })
  }, [])

  const Persons = () => {
    return (
      <div>
        {persons.map((person) => {
          if (person.name.toLowerCase().includes(keyword.toLowerCase())) {
            return  <Person key={person.name} person={person} />
          }
        })}
      </div>
    )
  }

  const Person = ({person}) => {
    return (
      <div>{person.name} {person.number} <DeleteButton person={person}/></div>
    )
  }

  const DeleteButton = ({person}) => {
    return (
      <button onClick={() => deleteName(person)} type="submit">delete</button>
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value)
  }
  
  const addName = (event) => {
    event.preventDefault()
    if (isPersonExist()) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updateNumber()
      } 
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    } 

    phonebookService
      .create(personObject)
      .then(createdPerson => {
        console.log(createdPerson)
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })

  }

  const updateNumber = () => {
    const updatingPersonObject = {
      name: newName,
      number: newNumber
    } 
    phonebookService
      .update(updatingPersonId, updatingPersonObject)
      .then(updatedPerson => {
        setPersons(persons.map(person => {
          if (person.id === updatedPerson.id) {
            return updatedPerson
          }
          return person
        }))
      })
  }
  
  const deleteName = (props) => {
    const confirm = window.confirm(`Delete ${props.name}?`)
    if (!confirm) {
      return
    } 
    const deletingId = props.id
    phonebookService
    .remove(deletingId)
    .then(
      setPersons(persons.filter((person) => {
        if (person.id !== deletingId) {
          return person
        }
      }))
    )
  }

  const isPersonExist = () => {
    let isExist = false
    persons.forEach((person) => {
        if (person.name === newName) {
          updatingPersonId = person.id
          isExist = true
          return
        } 
    })
    return isExist
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        keyword={keyword} 
        handleKeywordChange={handleKeywordChange} />

      <h3>add a new</h3>
      <PersonForm 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />

      <h3>Numbers</h3>
      <Persons />
    </div>
  )
}

export default App