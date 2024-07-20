import { useState } from 'react'

const BlogForm = ({addBlog}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = () => {
    addBlog({title,author,url})
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
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
export default BlogForm