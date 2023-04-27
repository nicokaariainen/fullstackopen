import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Notification from '../components/Notification'
import { setNotification, hideNotification, setTimeoutId } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`You voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`))
        const timeoutId = setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
        dispatch(setTimeoutId(timeoutId))
    }

    const compareAnecdotes = (a, b) => {
        return b.votes - a.votes
    }

    return (
        <div>
        <Notification/>
        <Filter/>
        {filteredAnecdotes
        .sort(compareAnecdotes)
        .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList