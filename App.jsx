import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    let isPersonExist = false
    persons.forEach((person) => {
      if (person.name == newName) {
        alert(`${newName} is already added to phonebook`)
        isPersonExist = true
      }
    })
    if (isPersonExist) {
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    } 
    setPersons(persons.concat(personObject))
    setNewName('')
    console.log(persons)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }

  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber)
  }

  const Display = ({person}) => {
    return (
      <div>
        {person.name} {person.number}
      </div>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button onClick={addName} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {persons.map(person => 
          <Display key={person.name} person={person}/>
        )}
      </>
    </div>
  )
}

export default App