const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
var mongoose = require('mongoose')

const initialBlogs = [
    {
      title: "Testblog",
      author: "Testi Testinen",
      url: "http://example.com",
      likes: 0,
      user: "testi"
    },
    {
      title: "Testblog2",
      author: "Mikko Mallikas",
      url: "http://example.com",
      likes: 0,
      user: "nico"
    },
]

const initialUsers = [
    {
      username: "testi",
      name: "Testi Testinen",
      password: "testi"
    },
    {
      username: "nico",
      name: "Nico",
      password: "nico"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const getToken = async () => {
    const users = await usersInDb()
    const user = users[0]
    const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET)
    return token
}

module.exports = {
    initialBlogs, initialUsers, blogsInDb, usersInDb, getToken
}