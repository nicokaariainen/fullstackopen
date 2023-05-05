import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("blog component", () => {
  test("renders title", () => {
    const blog = {
      title: "Test title",
      author: "Test author",
      url: "Test url",
      likes: 0,
      user: {
        username: "Test username",
        name: "Test name",
        id: "Test id",
      },
    }

    const user = {
      username: "Test username",
      name: "Test name",
      id: "Test id",
    }

    render(<Blog blog={blog} loggedUser={user} />)

    const elem = screen.getByTestId("title")
    expect(elem).toHaveTextContent("Test title")
  })

  test("renders url, likes and user after view is pressed", async () => {
    const blog = {
      title: "Test title",
      author: "Test author",
      url: "Test url",
      likes: 0,
      user: {
        username: "Test username",
        name: "Test name",
        id: "Test id",
      },
    }

    const user = {
      username: "Test username",
      name: "Test name",
      id: "Test id",
    }

    render(<Blog blog={blog} loggedUser={user} />)

    const eventUser = userEvent.setup()
    const button = screen.getByText("view")
    await eventUser.click(button)

    const elem = screen.getByTestId("url")
    expect(elem).toHaveTextContent("Test url")

    const elem2 = screen.getByTestId("likes")
    expect(elem2).toHaveTextContent("0")

    const elem3 = screen.getByTestId("user")
    expect(elem3).toHaveTextContent("added by Test username")
  })

  test("like button is pressed twice", async () => {
    const blog = {
      title: "Test title",
      author: "Test author",
      url: "Test url",
      likes: 0,
      user: {
        username: "Test username",
        name: "Test name",
        id: "Test id",
      },
    }

    const user = {
      username: "Test username",
      name: "Test name",
      id: "Test id",
    }

    const mockHandler = jest.fn()
    render(<Blog blog={blog} loggedUser={user} updateBlog={mockHandler} />)

    const eventUser = userEvent.setup()
    const button = screen.getByText("view")
    await eventUser.click(button)

    const likeButton = screen.getByText("like")
    await eventUser.click(likeButton)
    await eventUser.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
