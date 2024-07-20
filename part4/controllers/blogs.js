const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { body, token } = request
  if (!token.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(token.id)
  const blog = new Blog({
    ...body,
    user: user.id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { body } = request
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    body,
    {
      new: true,
      runValidators: true,
      context: 'query'
    })

  if (!updatedBlog) {
    return response.status(404).end()
  }

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = blogsRouter