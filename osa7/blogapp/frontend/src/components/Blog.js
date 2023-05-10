import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { handleUpdateBlog, handleCommentBlog } from "../reducers/blogsReducer"
import { handleDeleteBlog } from "../reducers/blogsReducer"
import { setNotification } from "../reducers/notificationReducer"

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
        navigate("/")
      } else {
        dispatch(setNotification("Error deleting blog", 5, true))
      }
    }
  }

  const handleComment = (event) => {
    event.preventDefault()

    const comment = event.target.comment.value
    event.target.comment.value = ""
    dispatch(handleCommentBlog(blog, comment))
    dispatch(setNotification(`comment ${comment} added`, 5, false))
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
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
