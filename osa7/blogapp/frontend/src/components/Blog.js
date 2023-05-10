import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { handleUpdateBlog } from "../reducers/blogsReducer"
import { handleDeleteBlog } from "../reducers/blogsReducer"
import { setNotification } from "../reducers/notificationReducer"

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const loggedUser = useSelector((state) => state.user)
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  if (blog === null || blog === undefined) {
    return null
  }
  const addedByUser = blog.user.username === loggedUser.username

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(handleUpdateBlog(updatedBlog))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const success = await dispatch(handleDeleteBlog(blog))
      if (success) {
        dispatch(
          setNotification(
            `blog ${blog.title} by ${blog.author} deleted`,
            5,
            false
          )
        )
      } else {
        dispatch(setNotification("Error deleting blog", 5, true))
      }
    }
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={`https://${blog.url}`}>{blog.url}</a>
      <br />
      {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button>
      <br />
      added by {blog.user.username}
      {addedByUser ? (
        <div data-testid="remove">
          <button id="remove-blog-button" onClick={() => handleDelete(blog)}>
            remove
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default Blog
