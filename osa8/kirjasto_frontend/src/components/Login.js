import { useMutation } from "@apollo/client"
import { LOGIN, ME } from "../queries"
import { useState, useEffect } from "react"

const Login = ({ show, setToken, setPage }) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    refetchQueries: [{ query: ME }],
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
    }
  }, [result.data]) // eslint-disable-line

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({
      variables: {
        username,
        password,
      },
    })
    setPage("authors")
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
