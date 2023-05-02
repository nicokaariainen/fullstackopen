import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 }, {
      onError: () => {
        dispatch({ type: 'SET_NOTIFICATION', data: 'too short anecdote, must have length 5 or more' })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        },
          5000)
      },
      onSuccess: () => {
        dispatch({ type: 'SET_NOTIFICATION', data: `created new anecdote '${content}'` })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        },
          5000)
      }
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
