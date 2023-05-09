import Blog from "./Blog"
import { useSelector } from "react-redux"
import CreateForm from "./CreateForm"
import Togglable from "./Togglable"

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const compareBlogs = (a, b) => {
    return b.props.blog.likes - a.props.blog.likes
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .map((blog) => <Blog key={blog.id} blog={blog} />)
        .sort(compareBlogs)}
      <Togglable buttonLabel="create new blog">
        <CreateForm />
      </Togglable>
    </div>
  )
}

export default BlogList
