require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const PhoneBook = require('./models/PhoneBook')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  PhoneBook.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  PhoneBook.find(request.query).then(result => {
    response.json(result)
  })
})

app.post('/api/persons', (request, response, next) => {
  const { body } = request

  if (!body.name || !body.number) {
    return response.status(400).send({ error: 'The name or number is missing' })
  }

  const newPerson = new PhoneBook(body)

  newPerson.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { id } = request.params
  const { body } = request

  PhoneBook.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  PhoneBook.findByIdAndDelete(id).then(() => response.status(204).end())
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  PhoneBook.find({}).then(persons => {
    response.send(`
    <div>
      <div>Phonebook has info for ${persons.length} people</div>
      <div>${Date().toString()}</div>
    </div>`
    )
  })

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})