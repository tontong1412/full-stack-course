const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('return the correct amount of blog posts', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 2)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  assert('id' in response.body[0])
  const hexStringPattern = /^[a-fA-F0-9]{24}$/;
  assert.match(response.body[0].id, hexStringPattern)
})

test('a valid blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(helper.initialBlogs[2])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, 3)

  const titles = blogsAtEnd.map(r => r.title)
  assert(titles.includes(helper.initialBlogs[2].title))
})

test('blog without title is not added', async () => {
  const newBlog = {
    url: 'http://test.com',
    author: 'Harry Potter'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, 2)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'How to be famouse',
    author: 'Harry Potter'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, 2)
})

test('blog without likes is added with default value 0', async () => {
  const newBlog = {
    title: 'How to be famous',
    author: 'Harry Potter',
    url: 'http://test.com'
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  assert.strictEqual(response.body.likes, 0)

})

after(async () => {
  await mongoose.connection.close()
})