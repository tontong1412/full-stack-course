import { useState } from "react"

const Blog = ({ blog }) => {

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
    {blog.title}
    <button onClick={()=>setViewDetail(!viewDetail)}>{viewDetail? 'hide':'view'}</button>
    {
      viewDetail&&(
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button>like</button></div>
          <div>{blog.author}</div>
        </div>
      )
    }
    
  </div>  
  )
}

export default Blog