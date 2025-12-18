import { useEffect } from 'react'
import { useState } from 'react'
import json_server from './service.js'

const Input = ({ label, state, setState }) => {
  return (
    <div>
      <label>{label}: </label>
      <input value={state} onChange={(e) => setState(e.target.value)}/>
    </div>
  )
}

const Form = ({ state, setState }) => {
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const addPerson = (e) => {
    e.preventDefault();

    if (!newName) return alert('Name cant be empty');

    for (const person of state) {
      if (person.name == newName) {
        return alert(`Name ${newName} is already in phonebook`);
      }
    }

    json_server
    .create({ name: newName, number: phoneNumber, id: String(Number(state[state.length - 1]?.id) + 1) })
    .then(response => {
      console.log(response)
      setState(prev => prev.concat(response.data))
      setNewName('')
      setPhoneNumber('')
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

  useEffect(() => {
    json_server.getAll()
    .then(r => {      
      setPersons(r.data)
    })
  }, [])

  const [filter, setFilter] = useState('')
  const filteredPersons = Filter(persons, filter)

  return (
    <div>
      <h1>Phonebook</h1>
      <Input label={"Filter"} state={filter} setState={setFilter}/>
      <h2>Add new one</h2>
      <Form state={persons} setState={setPersons}/>
      <h2>Numbers</h2>
      {filteredPersons.map((p, idx) => 
        <table key={idx}>
          <tbody>
            <tr>
              <Part content={p.name} />
              <Part content={p.number} />
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )

}

export default App