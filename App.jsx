import { useState } from 'react'


const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with <input value={props.keyword} onChange={props.handleKeywordChange} />
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button onClick={props.addName} type="submit">add</button>
      </div>
    </form>
    )
}

const Persons = (props) => {
  console.log(props)
  return (
    <>
      {props.persons.map(person => {
        if (person.name.toLowerCase().includes(props.keyword.toLowerCase())) {
          return <DisplayPerson key={person.name} person={person} />
        }
      })}
    </>
  )
}

const DisplayPerson = ({person}) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }
  
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber)
  }
  
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value)
  }
  
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter keyword={keyword} handleKeywordChange={handleKeywordChange} />

      <h3>add a new</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addName={addName} 
      />
      <h3>Numbers</h3>
      <Persons persons={persons} keyword={keyword} />
    </div>
  )
}

export default App