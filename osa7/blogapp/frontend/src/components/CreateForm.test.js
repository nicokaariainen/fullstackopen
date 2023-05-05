import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CreateForm from "./CreateForm"

describe("blog creation form", () => {
  test("calls the callback function with correct parameters", async () => {
    const createBlog = jest.fn()

    render(<CreateForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText("Blog title")
    const authorInput = screen.getByPlaceholderText("Blog author")
    const urlInput = screen.getByPlaceholderText("Blog url")
    const create = screen.getByText("create")

    const eventUser = userEvent.setup()
    await eventUser.type(titleInput, "Test title")
    await eventUser.type(authorInput, "Test author")
    await eventUser.type(urlInput, "Test url")
    await eventUser.click(create)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe("Test title")
    expect(createBlog.mock.calls[0][0].author).toBe("Test author")
    expect(createBlog.mock.calls[0][0].url).toBe("Test url")
  })
})
