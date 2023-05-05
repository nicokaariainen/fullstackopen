const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

afterAll(async () => {
  await mongoose.connection.close()
})

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const hashedUsers = await Promise.all(helper.initialUsers.map(async user => {
      const passwordHash = await bcrypt.hash(user.password, 10)
      return { ...user, passwordHash }
    }))
    await User.insertMany(hashedUsers)

    await Blog.deleteMany({})
    const dbUsers = await helper.usersInDb()
    const blogs = helper.initialBlogs.map(blog => {
      const user = dbUsers.find(user => user.username === blog.user)
      return { ...blog, user: user.id }
    })
    await Blog.insertMany(blogs)
    helper.token = await helper.getToken()
  })

  test('correct number of JSON blogs are returned', async () => {
    const resp = api.get('/api/blogs')
    resp
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await resp
    expect(blogs.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog must have identifier field named id', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })

  describe('when adding a new blog', () => {

    test('adding succeeds when all fields are valid', async () => {
      const newBlog = {
        title: 'Testblog3',
        author: 'Nico',
        url: 'http://example.com',
        likes: 0,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', 'Bearer ' + helper.token)
        .expect(201)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
      const titles = blogs.map(blog => blog.title)
      expect(titles).toContainEqual(newBlog.title)
    })

    test('blog will default likes to 0 if not given', async () => {
      const newBlog = {
        title: 'Testblog3',
        author: 'Nico',
        url: 'http://example.com',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', 'Bearer ' + helper.token)
        .expect(201)

      const blogs = await helper.blogsInDb()
      const addedBlog = blogs.find(blog => blog.title === newBlog.title)
      expect(addedBlog.likes).toBe(0)
    })

    test('blog without title or url returns 400 bad request and is not added', async () => {
      const newBlog = {
        author: 'Nico',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', 'Bearer ' + helper.token)
        .expect(400)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('when deleting a blog', () => {

    test('deleting succeeds when id is valid', async () => {
      const initialBlogs = await helper.blogsInDb()
      const blogToDelete = initialBlogs[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', 'Bearer ' + helper.token)
        .expect(204)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length - 1)
      const titles = blogs.map(blog => blog.title)
      expect(titles).not.toContainEqual(blogToDelete.title)
    })

    test('deleting fails when id is invalid', async () => {
      const invalidId = 'miau'
      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', 'Bearer ' + helper.token)
        .expect(400)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
    })

    test('deleting fails when token is invalid', async () => {
      const initialBlogs = await helper.blogsInDb()
      const blogToDelete = initialBlogs[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('when updating a blog', () => {

    test('updating succeeds when id is valid', async () => {
      const initialBlogs = await helper.blogsInDb()
      const blogToUpdate = initialBlogs[0]
      const newBlog = {
        ...blogToUpdate,
        likes: 100
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
      const updatedBlog = blogs.find(blog => blog.id === blogToUpdate.id)
      expect(updatedBlog.likes).toBe(100)
    })

    test('updating fails when id is invalid', async () => {
      const initialBlogs = await helper.blogsInDb()
      const blogToUpdate = initialBlogs[0]
      const newBlog = {
        ...blogToUpdate,
        likes: 100
      }

      const invalidId = 'miau'
      await api
        .put(`/api/blogs/${invalidId}`)
        .send(newBlog)
        .expect(400)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
    })

    test('updating fails when blog is invalid', async () => {
      const initialBlogs = await helper.blogsInDb()
      const blogToUpdate = initialBlogs[0]
      const newBlog = {
        ...blogToUpdate,
        likes: 100,
        title: null
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(400)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
      const updatedBlog = blogs.find(blog => blog.id === blogToUpdate.id)
      expect(updatedBlog.likes).toBe(blogToUpdate.likes)
    })
  })
})

describe('when there are initially users in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const hashedUsers = await Promise.all(helper.initialUsers.map(async user => {
      const passwordHash = await bcrypt.hash(user.password, 10)
      return { ...user, passwordHash }
    }))
    await User.insertMany(hashedUsers)
  })

  test('creation succeeds with a fresh username', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      username: 'kissa',
      name: 'miau',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await helper.usersInDb()
    expect(users).toHaveLength(initialUsers.length + 1)
    const usernames = users.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      username: 'testi',
      name: 'Test',
      password: 'root'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const users = await helper.usersInDb()
    expect(users).toHaveLength(initialUsers.length)
  })

  test('creation fails with proper statuscode and message if username not valid', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      username: 'aa',
      name: 'Test',
      password: 'test'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length')

    const users = await helper.usersInDb()
    expect(users).toHaveLength(initialUsers.length)
  })

  test('creation fails with proper statuscode and message if password not valid', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'Test',
      password: 'aa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')

    const users = await helper.usersInDb()
    expect(users).toHaveLength(initialUsers.length)
  })
})
