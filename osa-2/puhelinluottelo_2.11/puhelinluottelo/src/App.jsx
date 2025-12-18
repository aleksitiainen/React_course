import { useEffect } from 'react'
import { useState } from 'react'
import json_server from './service.js'
import Notification from './Notification.jsx'
import './App.css'

const Input = ({ label, state, setState }) => {
  return (
    <div>
      <label>{label}: </label>
      <input value={state} onChange={(e) => setState(e.target.value)}/>
    </div>
  )
}

const Form = ({ state, setState, errorState, successState }) => {
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!newName) {
      return errorState('Name cant be empty')
    }

    const existingPerson = state.find(p => p.name === newName)

    if (existingPerson) {
      if (existingPerson.number === phoneNumber) {
        return errorState(`Name ${newName} is already in phonebook`)
      }

      if (!window.confirm(
        'Same name already exists with different phone number. Replace the old number?'
      )) return

      const updatedPerson = {
        ...existingPerson,
        number: phoneNumber
      }

      json_server
        .update(existingPerson.id, updatedPerson)
        .then(response => {
          setState(prev =>
            prev.map(p =>
              p.id === existingPerson.id ? response.data : p
            )
          )
          successState('Person updated')
          setNewName('')
          setPhoneNumber('')
        })
        .catch(error => {
          errorState(`${newName} was already removed from server`)        
          setTimeout(() => {          
            errorState(null)        
          }, 5000)        
          setState(prev => prev.filter(p => p.id != existingPerson.id))
        })
      
    } else {
      json_server
        .create({ name: newName, number: phoneNumber, id: String(Number(state[state.length - 1] + 1))})
        .then(response => {
          setState(prev => prev.concat(response.data))
          successState(`${newName} added to phonebook`)
          setNewName('')
          setPhoneNumber('')
        })
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <Input label="Name" state={newName} setState={setNewName}/>
      <Input label="Number" state={phoneNumber} setState={setPhoneNumber}/>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = (array, filterParam ) => {
  return array.filter(p => p.name.toLocaleLowerCase().includes(filterParam.toLocaleLowerCase()));
}

const Part = ({ content }) => {
  return (
    <td>{content}</td>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  
  useEffect(() => {
    json_server.getAll()
    .then(r => {      
      setPersons(r.data)
    })
  }, [])

  const [filter, setFilter] = useState('')
  const filteredPersons = Filter(persons, filter)

  const DeletePerson = (id) => {
    if (!window.confirm('Are sure you want to delete this person from phonebook')) return;
    json_server.deleteId(id)
    .then(r => {
      setPersons(prev => prev.filter(p => p.id !== r.data.id))
      setErrorMessage('Person deleted from phonebook')
    })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Input label={"Filter"} state={filter} setState={setFilter}/>

      <h2>Add new one</h2>
      {errorMessage && <Notification className={"error"} message={errorMessage} /> }
      {successMessage && <Notification className={"success"} message={successMessage} /> }
      <Form state={persons} setState={setPersons} errorState={setErrorMessage} successState={setSuccessMessage}/>

      <h2>Numbers</h2>
      {filteredPersons.map((p, idx) => 
        <table key={p.id}>
          <tbody>
            <tr>
              <Part content={p.name} />
              <Part content={p.number} />
              <td>
                <button onClick={() => DeletePerson(p.id)}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )

}

export default App