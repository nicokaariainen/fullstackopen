import { Alert } from "@mui/material"
import { useSelector } from "react-redux"

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification)

  const notificationStyle = {
    color: isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!message) {
    return null
  }

  return <Alert severity={isError ? "error" : "success"}>{message}</Alert>
}

export default Notification
