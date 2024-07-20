const BlogForm = ({
  addBlog,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
      <div>
        author
        <input
          name="author"
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          name="url"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
    </>
  )
}
export default BlogForm