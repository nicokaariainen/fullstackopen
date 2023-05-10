import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogsReducer"
import { setNotification } from "../reducers/notificationReducer"
import { Button, TextField } from "@mui/material"

const CreateForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const success = await dispatch(
      createBlog({
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value,
      })
    )

    if (success) {
      dispatch(
        setNotification(
          `a new blog ${event.target.title.value} by ${event.target.author.value} added`,
          5,
          false
        )
      )
      event.target.title.value = ""
      event.target.author.value = ""
      event.target.url.value = ""
    } else {
      dispatch(setNotification("Error creating blog", 5, true))
    }
  }

  const style = {
    marginBottom: 1,
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField sx={style} size="small" label="Blog title" id="title" />
        </div>
        <div>
          <TextField sx={style} size="small" label="Blog author" id="author" />
        </div>
        <div>
          <TextField sx={style} size="small" label="Blog url" id="url" />
        </div>
        <Button
          sx={style}
          variant="contained"
          color="success"
          type="submit"
          id="create-blog-button"
        >
          create
        </Button>
      </form>
    </>
  )
}

export default CreateForm
