import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({handleFilter}) => {
  return <div>filter shown with <input onChange={handleFilter}/></div>
}

const PersonForm = ({handleNameChange, handleNumberChange, addName, newName, newNumber}) => {
  return  <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

const Person = ({name, number}) => {
  return <div>{name} {number}</div>
}

const Persons = ({persons, filter}) => {
  return <>
  {
    persons
    .filter(person=> person.name.toLowerCase().includes(filter))
    .map(person=><Person key={person.name} name={person.name} number={person.number}/>)
  }
</>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameExists = persons.find(person=> person.name === newName)
    if(nameExists){
      alert(`${newName} is already added to phonebook`)
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const filterLower = event.target.value.toLowerCase()
    setFilter(filterLower)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addName={addName}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App