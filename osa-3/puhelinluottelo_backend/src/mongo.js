const mongoose = require('mongoose')
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.wbxcwov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebook_Schema = new mongoose.Schema({
    name: String,
    number: String

})

const name = process.argv[3];
const number = process.argv[4];

//luodaan model, malli, muistiinpanoille
const Phonebook = mongoose.model('Phonebook', phonebook_Schema)

if (!name || !number) {
    console.log("phonebook:")
    Phonebook.find({}).then(result => {
        result.forEach(person => {

            console.log(person.name, person.number)

        })

        mongoose.connection.close()
    })
    return
}

if (name || number) {
    const person = new Phonebook({
        name,
        number
    })

    person.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
        
        mongoose.connection.close()
    })
}
//tehtään uusi muistiinpano olio, joka tallennetaan tietokantaan
