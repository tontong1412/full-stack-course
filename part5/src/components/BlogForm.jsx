import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()
    addBlog({ title,author,url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="blog-form">
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title
          <input
            name="title"
            value={title}
            placeholder='Title of the blog'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author
          <input
            name="author"
            value={author}
            placeholder='Author of the blog'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url
          <input
            name="url"
            value={url}
            placeholder='Url of the blog'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm