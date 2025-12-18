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

  const addPerson = (e) => {
    e.preventDefault();

    if (!newName) {
      console.error('Name cant be empty');
      return errorState('Name cant be empty');
    } 

    for (const person of state) {
      if (person.name == newName) {
        console.error(`Name ${newName} is already in phonebook`);
        return errorState(`Name ${newName} is already in phonebook`);
      }
    }

    json_server
    .create({ name: newName, number: phoneNumber, id: String(Number(state[state.length - 1]?.id) + 1) })
    .then(response => {
      errorState('')
      setState(prev => prev.concat(response.data))
      setNewName('')
      setPhoneNumber('');
      successState(`${newName} added to phonebook`)
    })
  }


  return (
    <form onSubmit={addPerson}>
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
    json_server.delete(id)
    .then(r => {
      setPersons(prev => prev.filter(p => p.id !== r.data.id))
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