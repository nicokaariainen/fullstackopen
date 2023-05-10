import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { initializeUsers } from "../reducers/usersReducer"

const User = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  )

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
