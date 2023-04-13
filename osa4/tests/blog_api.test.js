const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)
const logger = require("../utils/logger")
const Blog = require("../models/blog")
const helper = require("./test_helper")

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

afterAll(async () => {
    await mongoose.connection.close()
})

describe("when there are initially some blogs saved", () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test("correct number of JSON blogs are returned", async () => {
        const resp = api.get("/api/blogs")
        resp
            .expect(200)
            .expect("Content-Type", /application\/json/)
    
        const blogs = await resp
        expect(blogs.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test("blog must have identifier field named id", async () => {
        const blogs = await helper.blogsInDb()
        expect(blogs[0].id).toBeDefined()
    })
    
    describe("when adding a new blog", () => {

        test("adding succeeds when all fields are valid", async () => {
            const newBlog = {
                title: "Testblog3",
                author: "Nico",
                url: "http://example.com",
                likes: 0,
            }
        
            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201)
        
            const blogs = await helper.blogsInDb()
            expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
            const titles = blogs.map(blog => blog.title)
            expect(titles).toContainEqual(newBlog.title)
        })

        test("blog will default likes to 0 if not given", async () => {
            const newBlog = {
                title: "Testblog3",
                author: "Nico",
                url: "http://example.com",
            }
        
            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201)
        
            const blogs = await helper.blogsInDb()
            const addedBlog = blogs.find(blog => blog.title === newBlog.title)
            expect(addedBlog.likes).toBe(0)
        })

        test("blog without title or url returns 400 bad request and is not added", async () => {
            const newBlog = {
                author: "Nico",
                likes: 10,
            }
        
            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(400)
        
            const blogs = await helper.blogsInDb()
            expect(blogs).toHaveLength(helper.initialBlogs.length)
        })
    })

    describe("when deleting a blog", () => {

        test("deleting succeeds when id is valid", async () => {
            const initialBlogs = await helper.blogsInDb()
            const blogToDelete = initialBlogs[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogs = await helper.blogsInDb()
            expect(blogs).toHaveLength(helper.initialBlogs.length - 1)
            const titles = blogs.map(blog => blog.title)
            expect(titles).not.toContainEqual(blogToDelete.title)
        })

        test("deleting fails when id is invalid", async () => {
            const invalidId = "miau"
            await api
                .delete(`/api/blogs/${invalidId}`)
                .expect(400)

            const blogs = await helper.blogsInDb()
            expect(blogs).toHaveLength(helper.initialBlogs.length)
        })
    })

    describe("when updating a blog", () => {

        test("updating succeeds when id is valid", async () => {
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

        test("updating fails when id is invalid", async () => {
            const initialBlogs = await helper.blogsInDb()
            const blogToUpdate = initialBlogs[0]
            const newBlog = {
                ...blogToUpdate,
                likes: 100
            }

            const invalidId = "miau"
            await api
                .put(`/api/blogs/${invalidId}`)
                .send(newBlog)
                .expect(400)

            const blogs = await helper.blogsInDb()
            expect(blogs).toHaveLength(helper.initialBlogs.length)
        })

        test("updating fails when blog is invalid", async () => {
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
