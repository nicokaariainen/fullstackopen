import { useState, useEffect } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommendations from "./components/Recommendations"
import { useApolloClient, useSubscription } from "@apollo/client"
import { BOOK_ADDED } from "./queries"

const App = () => {
  useEffect(() => {
    const storageToken = localStorage.getItem("library-user-token")
    if (storageToken) {
      setToken(storageToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`New book added: ${data.data.bookAdded.title}`)
    },
  })

  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
        {token ? (
          <button onClick={() => setPage("recommendations")}>
            recommendations
          </button>
        ) : null}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />

      <Recommendations show={page === "recommendations"} />
    </div>
  )
}

export default App
