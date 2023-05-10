import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import CreateForm from "./CreateForm"
import Togglable from "./Togglable"
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material"

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const compareBlogs = (a, b) => {
    return b.likes - a.likes
  }

  return (
    <div>
      <h2>blogs</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {[...blogs].sort(compareBlogs).map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Togglable buttonLabel="create new blog">
        <CreateForm />
      </Togglable>
    </div>
  )
}

export default BlogList
