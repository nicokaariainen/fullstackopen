import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const usersReducer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    removeUsers(state, action) {
      return []
    },
  },
})

export const { setUsers, removeUsers } = usersReducer.actions

export default usersReducer.reducer

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}
