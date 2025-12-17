import { useState } from 'react'

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

    const newPersons = [...state];
    newPersons.push({name: newName, number: phoneNumber})
    setState(newPersons);
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
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