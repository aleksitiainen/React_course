const express = require('express');
const app = express();

const persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
    }
]

app.get('/api/persons', async(req, res) => {
    return res.json(persons)
})

app.get('/api/persons/:id', async(req, res) => {
    const { id } = req.params;

    const finded = persons.find(p => p.id === id);

    if (!finded) return res.sendStatus(404);
    return res.status(200).json(finded)
})

app.post('/api/persons', (req, res) => {
    const { person } = req.body;

    if (!person.name || !person.phone_number) return res.status(400).json({ error: 'All fields are required'});
    if (persons.includes(person.name)) return res.status(400).json({ error: 'Name must be unique'});

    persons.push({...person, id: String(Number(persons[persons.length - 1] + 1))});
    return res.status(201).json(persons)
})

app.delete('/api/persons/:id', (req, res) => {
    const {id} = req.params;

    const person = persons.find((p) => p.id === id);

    if (!person) return res.sendStatus(404);

    if (person) {
        persons.pop(person)
        return res.status(200).json(person);
    } 
})

app.get('/api/info', async(req, res) => {
    return res.send(`Phonebook has ${persons.length} person <br> ${new Date(Date.now())}`)
})

app.listen(3001, () => console.log('Listening on port 3001'));