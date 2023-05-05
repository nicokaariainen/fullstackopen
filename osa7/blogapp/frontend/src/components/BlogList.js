import Blog from "./Blog"
import { useSelector } from "react-redux"

const BlogList = ({ loggedUser }) => {
  const blogs = useSelector((state) => state.blogs)

  const compareBlogs = (a, b) => {
    return b.props.blog.likes - a.props.blog.likes
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .map((blog) => (
          <Blog key={blog.id} blog={blog} loggedUser={loggedUser} />
        ))
        .sort(compareBlogs)}
    </div>
  )
}

export default BlogList
