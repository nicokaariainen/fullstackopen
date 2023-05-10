import Blog from "./Blog"
import { useSelector, useDispatch } from "react-redux"
import CreateForm from "./CreateForm"
import Togglable from "./Togglable"
import { initializeBlogs } from "../reducers/blogsReducer"
import { useEffect } from "react"

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
