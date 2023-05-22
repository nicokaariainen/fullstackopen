import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"
import { useEffect, useState } from "react"

const Recommendations = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const user = useQuery(ME, { pollInterval: 2000 })
  const books = useQuery(ALL_BOOKS, {
    variables: { chosenGenre: genre },
    pollInterval: 2000,
  })

  useEffect(() => {
    if (user.data && user.data.me) {
      setGenre(user.data.me.favoriteGenre)
    }
  }, [user.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  if (books.loading || user.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
