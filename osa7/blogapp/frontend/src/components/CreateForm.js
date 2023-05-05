import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogsReducer"
import { setNotification } from "../reducers/notificationReducer"

const CreateForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const success = await dispatch(
      createBlog({
        title: title,
        author: author,
        url: url,
      })
    )

    if (success) {
      dispatch(
        setNotification(`a new blog ${title} by ${author} added`, 5, false)
      )
      setTitle("")
      setAuthor("")
      setUrl("")
    } else {
      dispatch(setNotification("Error creating blog", 5, true))
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            id="title"
            placeholder="Blog title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            id="author"
            placeholder="Blog author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            id="url"
            placeholder="Blog url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create-blog-button">
          create
        </button>
      </form>
    </>
  )
}

export default CreateForm
