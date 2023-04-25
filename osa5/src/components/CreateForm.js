import React, { useState } from "react"
import PropTypes from "prop-types"

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async (event) => {
    event.preventDefault()

    const success = await createBlog({
      title: title,
      author: author,
      url: url
    })

    if (success) {
      setTitle("")
      setAuthor("")
      setUrl("")
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
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={url}
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create-blog-button">create</button>
      </form>
    </>
  )
}

CreateForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default CreateForm