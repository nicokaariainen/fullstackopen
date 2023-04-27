import { createSlice } from "@reduxjs/toolkit"

const initialState = { message: '', visible: false, timeoutId: null}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
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

export const { setNotification, hideNotification, setTimeoutId } = notificationSlice.actions
export default notificationSlice.reducer