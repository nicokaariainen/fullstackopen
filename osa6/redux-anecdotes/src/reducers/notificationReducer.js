import { createSlice } from "@reduxjs/toolkit"

const initialState = { message: '', visible: false, timeoutId: null}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            clearTimeout(state.timeoutId)
            return {
                ...state,
                message: action.payload,
                visible: true
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
                timeoutId: action.payload
            }
        }
    }
})

export const { showNotification, hideNotification, setTimeoutId } = notificationSlice.actions

export const setNotification = (message, timeout) => {
    return async dispatch => {
        dispatch(showNotification(message))
        const timeoutId = setTimeout(() => {
            dispatch(hideNotification())
        }, timeout * 1000)
        dispatch(setTimeoutId(timeoutId))
    }
}
export default notificationSlice.reducer