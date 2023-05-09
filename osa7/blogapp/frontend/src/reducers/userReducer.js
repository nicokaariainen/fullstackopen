import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"
import blogService from "../services/blogs"

const userReducer = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = userReducer.actions

export default userReducer.reducer
export const handleUserLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await userService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      return true
    } catch (exception) {
      return false
    }
  }
}
