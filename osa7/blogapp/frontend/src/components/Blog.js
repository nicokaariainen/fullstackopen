import { useState } from "react"
import PropTypes from "prop-types"
import { handleDeleteBlog, handleUpdateBlog } from "../reducers/blogsReducer"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const Blog = ({ blog, loggedUser }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
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
    <div style={blogStyle} data-testid="title" className="blog">
      {blog.title} {blog.author}{" "}
      <button className="view-button" onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      <div style={{ display: visible ? "" : "none" }}>
        <div data-testid="url">{blog.url}</div>
        <div data-testid="likes">
          {blog.likes} likes{" "}
          <button className="like-button" onClick={() => handleLike(blog)}>
            like
          </button>
        </div>
        <div data-testid="user">added by {blog.user.username}</div>
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
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
}

export default Blog
