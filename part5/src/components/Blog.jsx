import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => {

  const [viewDetail, setViewDetail] = useState(false)

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setViewDetail(!viewDetail)}>{viewDetail? 'hide':'view'}</button>
      {
        viewDetail&&(
          <div>
            <div>{blog.url}</div>
            <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
            <div>{blog.user.name}</div>
            {user.name===blog.user.name&&<div><button onClick={() => handleRemove(blog)}>remove</button></div>}
          </div>
        )
      }

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }),
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user : PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string.isRequired
  })
}

export default Blog