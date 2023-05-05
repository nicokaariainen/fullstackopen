const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((acc, blog) => {
    if (acc.likes > blog.likes) {
      return acc
    } else {
      return blog
    }
  }, blogs[0])
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  var authors = []
  blogs.forEach(blog => {
    let author = authors.find(author => author.author === blog.author)
    if (author) {
      author.likes += blog.likes
    } else {
      authors.push({ author: blog.author, likes: blog.likes })
    }
  })

  return authors.reduce((acc, author) => {
    if (acc.likes > author.likes) {
      return acc
    } else {
      return author
    }
  }, authors[0])
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes
}