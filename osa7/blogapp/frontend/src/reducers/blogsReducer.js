import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return [...state, action.payload]
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { addBlog, updateBlog, deleteBlog, setBlogs } = blogsSlice.actions

export default blogsSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      await blogService.create(blogObject)
      dispatch(initializeBlogs())
      return true
    } catch (exception) {
      return false
    }
  }
}

export const handleUpdateBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      await blogService.update(blogObject.id, blogObject)
      dispatch(updateBlog(blogObject))
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const handleDeleteBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogObject.id)
      dispatch(deleteBlog(blogObject))
      return true
    } catch (exception) {
      return false
    }
  }
}
