import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorMsg from './components/ErrorMsg'
import InfoMsg from './components/InfoMsg'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if(user===null){
    return (
      <>
        <ErrorMsg message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              data-testid='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              data-testid='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async(blogObject) => {
    blogService.create(blogObject).then(response => {
      setInfoMessage(`a new blog "${response.title}" added`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000)
      setBlogs(blogs.concat(response))
      setBlogFormVisible(false)
    }).catch(error => {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const handleRemove = (blog) => {
    if(confirm(`Delete ${blog.title} by ${blog.author}?`)){
      blogService.remove(blog.id)
        .then(response => {
          setInfoMessage(`Deleted ${blog.title} by ${blog.author}`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 3000)
          const newBlogs = blogs.filter(b => b.id !== blog.id)
          setBlogs(newBlogs)
        })
    }
  }

  const handleLike = async(blog) => {
    const newObj = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    }
    const updatedObj = await blogService.update(blog.id, newObj)
    setBlogs(blogs.map(blog => blog.id !== updatedObj.id ? blog : updatedObj))
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm addBlog={addBlog} />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ErrorMsg message={errorMessage} />
      <InfoMsg message={infoMessage}/>
      <h2>blogs</h2>
      <p>{`${user.name} is logged in`}</p>
      <button onClick={handleLogout}>log out</button>
      {blogForm()}

      {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
      )}
    </div>
  )
}

export default App