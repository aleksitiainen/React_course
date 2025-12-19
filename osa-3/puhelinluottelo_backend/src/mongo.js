const mongoose = require('mongoose')
const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)
console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })  
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phonebook_Schema = new mongoose.Schema({
    name: String,
    number: String

})

//luodaan model, malli, muistiinpanoille
const Phonebook = mongoose.model('Phonebook', phonebook_Schema)

module.exports = Phonebook