import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorMsg from './components/ErrorMsg'
import InfoMsg from './components/InfoMsg'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
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

  const addBlog = async(event)=>{
    event.preventDefault()

    blogService.create({
      title, author, url
    }).then(response=>{
      setInfoMessage(`a new blog "${response.title}" added`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000)
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
    }).catch(error=>{
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    })
    
  }

  const blogForm = () =>{
    return (
      <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
      <div>
        author
        <input
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
    </>
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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App