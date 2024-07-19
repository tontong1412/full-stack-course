const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => (likes += blog.likes), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null



  return blogs.reduce((max, blog) => {
    if (!max || blog.likes > max.likes) {
      return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      }
    }

    return max
  }, null)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}