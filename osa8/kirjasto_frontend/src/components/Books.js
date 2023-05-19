import { useQuery } from "@apollo/client"
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [chosenGenre, setGenre] = useState(null)
  const filteredBooks = useQuery(BOOKS_BY_GENRE, {
    variables: { chosenGenre },
  })
  const books = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (filteredBooks.loading || books.loading) {
    return <div>loading...</div>
  }

  const genres = books.data.allBooks
    .map((book) => book.genres)
    .reduce((a, b) => a.concat(b), [])
  const uniqueGenres = [...new Set(genres)]

  return (
    <div>
      <h2>books</h2>
      {chosenGenre ? (
        <p>
          in genre <strong>{chosenGenre}</strong>
        </p>
      ) : (
        <p>
          in genre <strong>all genres</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.map((genre) => (
        <button
          key={genre}
          onClick={() => {
            setGenre(genre)
            filteredBooks.refetch({ chosenGenre: genre })
            books.refetch()
          }}
        >
          {genre}
        </button>
      ))}
      <button
        onClick={() => {
          setGenre(null)
          filteredBooks.refetch({ chosenGenre: null })
          books.refetch()
        }}
      >
        all genres
      </button>
    </div>
  )
}

export default Books
