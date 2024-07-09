import { useState, useEffect } from 'react'
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

const Person = ({person, handleDeletePerson}) => {
  return <div>{person.name} {person.number} <button onClick={()=>handleDeletePerson(person)}>delete</button></div>
}

const Persons = ({persons, filter, handleDeletePerson}) => {
  return <>
  {
    persons
    .filter(person=> person.name.toLowerCase().includes(filter))
    .map(person=><Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>)
  }
</>
}

const ErrorMsg = ({message}) => {
  if(message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Notification = ({message}) => {
  if(message === null) {
    return null
  }
  return (
    <div className='info'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notiMessage, setNotiMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    
    const nameExists = persons.find(person=> person.name === newName)
    if(nameExists){
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService.update(nameExists.id, {...nameExists, number: newNumber})
          .then(response => {
            setNotiMessage(`Updated ${response.name}`)
            setTimeout(() => {
              setNotiMessage(null)
            }, 5000)
           setPersons(persons.map(person => person.name !== newName ? person : response))
          })
          .catch(error=>{
            setErrorMsg(`Information of ${nameExists.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMsg(null)
            }, 5000)
          })
      }
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject)
        .then(response => {
          setNotiMessage(`Added ${response.name}`)
          setTimeout(() => {
            setNotiMessage(null)
          }, 5000)
          setPersons(persons.concat(response))
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

  const handleDeletePerson = (person) => {
    if(confirm(`Delete ${person.name} ?`)){
      console.log('id',person.id)
      personService.remove(person.id)
        .then(response => {
          setNotiMessage(`Deleted ${response.name}`)
          setTimeout(() => {
            setNotiMessage(null)
          }, 5000)
          const newPersons = persons.filter(person => person.id !== response.id)
          setPersons(newPersons)
        })
    }
  }

  return (
    <div>
      <Notification message={notiMessage}/>
      <ErrorMsg message={errorMsg} />
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
      <Persons persons={persons} filter={filter} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App