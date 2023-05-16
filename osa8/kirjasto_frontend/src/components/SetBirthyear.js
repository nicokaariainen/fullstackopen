import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from "react-select"

const SetBirthyear = () => {
  const [born, setBorn] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)

  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    },
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: { name: selectedOption.value, born: Number(born) },
    })

    setSelectedOption(null)
    setBorn("")
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const options = authors.data.allAuthors.map((a) => {
    return { value: a.name, label: a.name }
  })

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear
