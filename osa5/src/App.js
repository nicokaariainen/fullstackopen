import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import CreateForm from "./components/CreateForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ text: null, isError: false })
  const blogFormRef = useRef()

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (text, isError) => {
    setNotification({
      ...notification,
      text: text,
      isError: isError
    })
    setTimeout(() => {
      setNotification({
        ...notification,
        text: null,
        isError: false
      })
    }, 5000)
  }

  const createBlog = async (blogObject) => {
    var success = true
    try {
      const createdBlog = await blogService.create(blogObject)
      notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      blogFormRef.current.toggleVisibility()
      fetchBlogs()
      success = true
    } catch (exception) {
      notify(exception.response.data.error, true)
      success = false
    }
    return success
  }

  const updateBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject.id, blogObject)
      fetchBlogs()
    } catch (exception) {
      notify(exception.response.data.error, true)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id)
      notify(`blog ${blogObject.title} by ${blogObject.author} deleted`)
      fetchBlogs()
    } catch (exception) {
      notify(exception.response.data.error, true)
    }
  }


  if (user === null) {
    return (
      <>
        <Notification text={notification.text} isError={notification.isError} />
        <LoginForm  setUser={setUser} notify={notify}/>
      </>
    )
  }

  return (
    <div>
      <Notification text={notification.text} isError={notification.isError} />
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={() => {setUser(null); window.localStorage.removeItem("loggedBlogappUser")}}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateForm createBlog={createBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
      ).sort((a,b) => b.props.blog.likes - a.props.blog.likes)}
    </div>
  )
}

export default App