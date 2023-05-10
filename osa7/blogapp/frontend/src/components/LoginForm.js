import { handleUserLogin } from "../reducers/userReducer"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { TextField, Button } from "@mui/material"

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const success = await dispatch(
      handleUserLogin(event.target.username.value, event.target.password.value)
    )
    if (success) {
      event.target.username.value = ""
      event.target.password.value = ""
      dispatch(setNotification("Logged in", 5, false))
    } else {
      dispatch(setNotification("Wrong credentials", 5, true))
    }
  }

  const style = {
    marginBottom: 1,
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <TextField sx={style} size="small" label="Username" id="username" />
        <br />
        <TextField
          sx={style}
          size="small"
          label="Password"
          id="password"
          type="password"
        />
        <br />
        <Button variant="contained" type="submit" id="login-button">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
