import { useState } from "react"

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  
  const [viewDetail, setViewDetail] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <button onClick={()=>setViewDetail(!viewDetail)}>{viewDetail? 'hide':'view'}</button>
    {
      viewDetail&&(
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={()=>handleLike(blog)}>like</button></div>
          <div>{blog.user.name}</div>
          {user.name===blog.user.name&&<div><button onClick={()=>handleRemove(blog)}>remove</button></div>}
        </div>
      )
    }
    
  </div>  
  )
}

export default Blog