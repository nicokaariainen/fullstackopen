import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogsReducer"
import { setUser } from "./reducers/userReducer"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import CreateForm from "./components/CreateForm"
import Togglable from "./components/Togglable"
import BlogList from "./components/BlogList"

const App = () => {
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    )
  }

  return (
    <div>
      <Notification />
      <p>
        {user.name} logged in{" "}
        <button
          onClick={() => {
            dispatch(setUser(null))
            window.localStorage.removeItem("loggedBlogappUser")
          }}
        >
          logout
        </button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateForm />
      </Togglable>
      <BlogList loggedUser={user} />
    </div>
  )
}

export default App
