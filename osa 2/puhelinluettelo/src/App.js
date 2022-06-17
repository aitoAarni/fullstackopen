import { useState, useEffect } from 'react'
import service from './services/numbers'


const Display = ({persons, filter, deleteNumber}) => {
  let displayPersons = [...persons]
  if (filter !== ""){
    displayPersons = persons.filter(person => person.name.toLowerCase().includes(filter))
  }
  return (
    <div>
      {displayPersons.map(person => 
      <>
      <p key={person.id}>{person.name} {person.number}</p>
      <button key={person.name} onClick={() => deleteNumber(person.id, person.name)}>delete</button>
      </>
      )}
    </div>
  )
}


const Filter = ({onFilterChange}) => { return (
  <form onSubmit={event => {event.preventDefault()}}>
  
  <input onChange={onFilterChange} />
  </form>)
}

const PersonForm = ({addNote, newName, onNameChange, newNumber, onNumberChange, pressSubmit}) => {return (
  <form onSubmit={addNote}>
  <div>
    name: <input value={newName} onChange={onNameChange}/>
  </div>
  <div>
    number: <input value={newNumber} onChange={onNumberChange}/>
  </div>
  <div>
    <button type="submit"  onClick={pressSubmit}>add</button>
  </div>
</form>)
}

const Flash = ({flash, setFlash}) => {
  if (!flash) return
  setTimeout(() => setFlash(""), 5000)
  return (
    <div className='flash'>
      <p>{flash} pee woop</p>
    </div>
  )
}


const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [persons, setPersons] = useState([])
  const [flash, setFlash] = useState("")

  const hook = () => {
    service.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])


  


  const addNote = event => {
    event.preventDefault()
  }
  
  const onNameChange = event => {
    setNewName(event.target.value)
  }
  
  const onNumberChange = event => {
    setNewNumber(event.target.value)
  }
  
  const onFilterChange = event => {
    setFilter(event.target.value)
  }

  const pressSubmit = () => {
    const names = persons.map(person => person.name)
    const numbers = persons.map(person => person.number)
    if (names.includes(newName)) {
      if (window.confirm(`Edit ${newName}'s numbahh?`)) {

        const index = names.findIndex(name => name === newName)
        service.update(persons[index].id, {...persons[index], number: newNumber})
        .then(response => {
          const temp = persons.map(person => person.name !== newName ? person : response.data)
          setPersons(temp)
          setFlash("edited number for " + newName)
        })
        .catch(() => {
          setFlash(`information of ${newName} has already been removed from the server`)
        })
      }
    }

    else if (!numbers.includes(newNumber) && newNumber.length > 2) {
      service.create({name: newName, number: newNumber, id: persons[persons.length-1].id + 1}).then(response => {
        setPersons(persons.concat(response.data))
        setFlash(`new contact ${newName} addedi `)
      })
    }
   else {
    setFlash('number already exists or is too short')
   }
    setNewName("")
    setNewNumber("")
  }

  const deleteNumber = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      service.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
  
      })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Flash flash={flash} setFlash={setFlash} />
      <Filter onFilterChange={onFilterChange}/>
      <h2>add a new</h2>
      <PersonForm pressSubmit={pressSubmit} onNameChange={onNameChange} 
      onNumberChange={onNumberChange} addNote={addNote} newName={newName} 
      newNumber={newNumber} />
      <h2>Numbers</h2>
      <Display persons={persons} filter={filter.toLowerCase()} deleteNumber={deleteNumber} />
    </div>
  )

}

export default App