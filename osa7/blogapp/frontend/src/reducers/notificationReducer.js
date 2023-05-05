import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: "",
  visible: false,
  timeoutId: null,
  isError: false,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      clearTimeout(state.timeoutId)
      return {
        ...state,
        message: action.payload.message,
        visible: true,
        isError: action.payload.isError,
      }
    },
    hideNotification(state, action) {
      return {
        initialState,
      }
    },
    setTimeoutId(state, action) {
      return {
        ...state,
        timeoutId: action.payload,
      }
    },
  },
})

export const { showNotification, hideNotification, setTimeoutId } =
  notificationSlice.actions

export const setNotification = (message, timeout, isError) => {
  return async (dispatch) => {
    dispatch(showNotification({ message, isError }))
    const timeoutId = setTimeout(() => {
      dispatch(hideNotification())
    }, timeout * 1000)
    dispatch(setTimeoutId(timeoutId))
  }
}
export default notificationSlice.reducer
