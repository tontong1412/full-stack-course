const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCounts = _.countBy(blogs, 'author')

  const topAuthor = _.maxBy(_.keys(authorCounts), author => authorCounts[author])
  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likesByAuthor = _.map(_.groupBy(blogs, 'author'), (authorBlogs, author) => {
    return {
      author: author,
      likes: _.sumBy(authorBlogs, 'likes')
    }
  })

  const topAuthor = _.maxBy(likesByAuthor, 'likes')

  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}