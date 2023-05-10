import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const BlogListItem = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} data-testid="title" className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
    </div>
  )
}

BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
}

export default BlogListItem
