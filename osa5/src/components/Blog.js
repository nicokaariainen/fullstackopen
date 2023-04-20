import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5
  }

  const addedByUser = blog.user.username === JSON.parse(window.localStorage.getItem("loggedBlogappUser")).username

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
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? "hide" : "view"}</button>
      <div style={{ display: visible ? "" : "none" }}>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></div>
        <div>added by {blog.user.username}</div>
        <div style= {{ display: addedByUser ? "" : "none" }}><button onClick={() => handleDelete(blog)}>remove</button></div>
      </div>
    </div>
  )
}

Blog.PropTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog