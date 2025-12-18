const express = require('express');
const app = express();
var morgan = require('morgan')
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body), 
  ].join(' ')
}))

app.use(express.json())

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
    const { name, number } = req.body;

    if (!name || !number) return res.status(400).json({ error: 'All fields are required'});
    if (persons.includes(name)) return res.status(400).json({ error: 'Name must be unique'});
    persons.push({name, number: String(number), id: String((persons.length) + 1)});
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