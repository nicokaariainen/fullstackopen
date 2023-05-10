import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "./reducers/userReducer"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Users from "./components/Users"
import User from "./components/User"
import BlogList from "./components/BlogList"

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

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
    <Router>
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
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
