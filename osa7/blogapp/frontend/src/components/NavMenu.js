import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../reducers/userReducer"

const NavMenu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const style = {
    padding: 5,
    backgroundColor: "lightgray",
  }

  return (
    <div style={style}>
      <Link to="/">blogs</Link> <Link to="/users">users</Link> {user.name}{" "}
      logged in{" "}
      <button
        onClick={() => {
          dispatch(setUser(null))
          window.localStorage.removeItem("loggedBlogappUser")
        }}
      >
        logout
      </button>
    </div>
  )
}

export default NavMenu
