require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const PhoneBook = require('./models/PhoneBook')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  PhoneBook.findById(id).then(person => response.json(person))
})

app.get('/api/persons', (request, response) => {
  PhoneBook.find({}).then(result => {
    response.json(result)
  })
})

app.post('/api/persons', (request, response) => {
  const { body } = request

  if (!body.name || !body.number) {
    return response.status(400).send({ error: 'The name or number is missing' })
  }

  const newPerson = new PhoneBook(body)

  newPerson.save().then(savedPerson => response.json(savedPerson))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  PhoneBook.findByIdAndDelete(id).then(person => response.status(204).json(person))
})

app.get('/info', (request, response) => {
  response.send(`
    <div>
      <div>Phonebook has info for ${persons.length} people</div>
      <div>${Date().toString()}</div>
    </div>`
  )
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})