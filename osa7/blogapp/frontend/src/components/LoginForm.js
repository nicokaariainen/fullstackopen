import React, { useState } from "react"
import { handleUserLogin } from "../reducers/userReducer"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const success = await dispatch(handleUserLogin(username, password))
    if (success) {
      setUsername("")
      setPassword("")
    } else {
      dispatch(setNotification("Wrong credentials", 5, true))
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
