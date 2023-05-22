import { useState, useEffect } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommendations from "./components/Recommendations"
import { useApolloClient, useSubscription } from "@apollo/client"
import { BOOK_ADDED } from "./queries"
import { ALL_BOOKS } from "./queries"

const App = () => {
  useEffect(() => {
    const storageToken = localStorage.getItem("library-user-token")
    if (storageToken) {
      setToken(storageToken)
    }
  }, [])

  const [chosenGenre, setGenre] = useState(null)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`New book added: ${addedBook.title}`)

      client.cache.updateQuery(
        { query: ALL_BOOKS, variables: { chosenGenre } },
        ({ allBooks }) => {
          return {
            allBooks: [...allBooks, addedBook],
          }
        }
      )
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

      <Books
        show={page === "books"}
        chosenGenre={chosenGenre}
        setGenre={setGenre}
      />

      <NewBook show={page === "add"} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />

      <Recommendations show={page === "recommendations"} />
    </div>
  )
}

export default App
