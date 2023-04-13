const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: "Testblog",
      author: "Testi Testinen",
      url: "http://example.com",
      likes: 0,
    },
    {
      title: "Testblog2",
      author: "Mikko Mallikas",
      url: "http://example.com",
      likes: 0,
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}