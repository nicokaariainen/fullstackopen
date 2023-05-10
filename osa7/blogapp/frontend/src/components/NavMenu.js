import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { AppBar, Button, Toolbar } from "@mui/material"

const NavMenu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const style = {
    marginLeft: 2,
    marginRight: 2,
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button sx={style} color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button sx={style} color="inherit" component={Link} to="/users">
          users
        </Button>
        {user.name} logged in
        <Button
          sx={style}
          color="inherit"
          onClick={() => {
            dispatch(setUser(null))
            window.localStorage.removeItem("loggedBlogappUser")
          }}
        >
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavMenu
