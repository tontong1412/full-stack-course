const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.post('/api/persons', (request, response) => {
  const person = { ...request.body }

  if (!person.name || !person.number) {
    return response.status(400).send({ error: 'The name or number is missing' })
  }

  if (persons.find(p => p.name === person.name)) {
    return response.status(409).send({ error: 'Name must be uique' })
  }
  const id = Math.floor(Math.random() * 100000);
  person.id = String(id)

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  console.log(id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  response.send(`
    <div>
      <div>Phonebook has info for ${persons.length} people</div>
      <div>${Date().toString()}</div>
    </div>`
  )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})