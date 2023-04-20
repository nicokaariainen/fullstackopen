import PropTypes from "prop-types"

const Notification = ({ text, isError }) => {

  const notificationStyle = {
    color: isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (text === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {text}
    </div>
  )
}

Notification.propTypes = {
  text: PropTypes.string,
  isError: PropTypes.bool.isRequired,
}

export default Notification