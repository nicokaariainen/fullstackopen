import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, loggedUser, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5
  }

  const addedByUser = blog.user.username === loggedUser.username

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  return(
    <div style={blogStyle} data-testid="title">
      {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? "hide" : "view"}</button>
      <div style={{ display: visible ? "" : "none" }}>
        <div data-testid="url">{blog.url}</div>
        <div data-testid="likes">{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></div>
        <div data-testid="user">added by {blog.user.username}</div>
        <div style= {{ display: addedByUser ? "" : "none" }}><button onClick={() => handleDelete(blog)}>remove</button></div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func
}

export default Blog