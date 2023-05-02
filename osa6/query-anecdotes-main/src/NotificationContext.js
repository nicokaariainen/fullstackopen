import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, dispatch] }>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationText = () => {
    const textAndDispatch = useContext(NotificationContext)
    return textAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const textAndDispatch = useContext(NotificationContext)
    return textAndDispatch[1]
}

export default NotificationContext