import { Alert } from "@mui/material"
import { useSelector } from "react-redux"

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification)

  if (!message) {
    return null
  }

  return <Alert severity={isError ? "error" : "success"}>{message}</Alert>
}

export default Notification
