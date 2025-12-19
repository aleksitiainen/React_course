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
const cors = require('cors')
require('dotenv').config();
app.use(cors())
app.use(express.json())

const Phonebook = require('./mongo')

app.get('/api/persons', async(req, res) => {
    Phonebook.find({}).then(p => {
        res.json(p)
    })
})

app.get('/api/persons/:id', async(req, res) => {

    const finded = await Phonebook.findById(req.params.id)

    if (!finded) return res.sendStatus(404);
    return res.status(200).json(finded)
})

app.post('/api/persons', async(req, res) => {
    const { name, number } = req.body;

    if (!name || !number) return res.status(400).json({ error: 'All fields are required'});

    const persons = await Phonebook.find({})

    if (persons.includes(name)) return res.status(400).json({ error: 'Name must be unique'});
    const person = await Phonebook.create({
      name,
      number
    })

    res.status(201).json(person)
})

app.put('/api/persons/:id', async(req, res) => {
    const { number } = req.body;

    if (!number) {
        return res.status(400).json({ error: 'number missing' })
    }

    const updatedPerson = await Phonebook.findByIdAndUpdate(
      req.params.id,
      { number },
      { new: true, runValidators: true, context: 'query' }
    )

    if (!updatedPerson) {
      return res.sendStatus(404)
    }

    res.json(updatedPerson)
})

app.delete('/api/persons/:id', async (req, res) => {
    const deletedPerson = await Phonebook.findByIdAndDelete(req.params.id)

    if (!deletedPerson) {
        return res.sendStatus(404)
    }

    res.json(deletedPerson);
})

app.get('/api/info', async(req, res) => {
    const count = await Phonebook.countDocuments({})
    return res.send(`
      Phonebook has ${count} persons<br>
      ${new Date()}
    `)
})

app.listen(process.env.PORT || 3001, () => console.log('Listening on port 3001'));