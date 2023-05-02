import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0, id: getId() }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const vote = async (id) => {
    const anecdotes = await getAll()
    const anecdoteToChange = anecdotes.find(n => n.id === id)
    const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
    return response.data
}

export default { 
    getAll,
    createNew,
    vote
}