describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    const user = {
      name: "Cypress",
      username: "cypress",
      password: "cypress",
    }
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user)
    cy.visit("")
  })

  it("Login form is shown", function () {
    cy.contains("log in to application")
    cy.get("input").length === 2
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("cypress")
      cy.get("#password").type("cypress")
      cy.get("#login-button").click()

      cy.contains("Cypress logged in")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("cypress")
      cy.get("#password").type("kissa")
      cy.get("#login-button").click()

      cy.contains("Wrong credentials")
      cy.get("html").should("not.contain", "Cypress logged in")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "cypress", password: "cypress" })
    })

    it("A blog can be created", function () {
      cy.contains("create new blog").click()
      cy.get("#title").type("Cypress blog")
      cy.get("#author").type("Cypress")
      cy.get("#url").type("www.example.com")
      cy.get("#create-blog-button").click()

      cy.contains("Cypress blog")
    })

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Cypress blog",
          author: "Cypress",
          url: "www.example.com",
          likes: 0,
        })
      })

      it("the blog can be liked", function () {
        cy.contains("view").click()
        cy.contains("0 likes")
        cy.contains("like").click()
        cy.contains("1 likes")
      })

      it("the blog can be deleted", function () {
        cy.contains("view").click()
        cy.get("#remove-blog-button").click()
        cy.contains("blog Cypress blog by Cypress deleted")
        cy.get(".blog").should("not.exist")
      })
    })

    describe("and multiple blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Cypress blog",
          author: "Cypress",
          url: "www.example.com",
          likes: 0,
        })
        cy.createBlog({
          title: "Cypress 2 blog",
          author: "Cypress",
          url: "www.example.com",
          likes: 1,
        })
        cy.createBlog({
          title: "Cypress 3 blog",
          author: "Cypress",
          url: "www.example.com",
          likes: 2,
        })
      })

      it("blogs are ordered by likes", function () {
        cy.get(".blog").eq(0).should("contain", "Cypress 3 blog")
        cy.get(".blog").eq(1).should("contain", "Cypress 2 blog")
        cy.get(".blog").eq(2).should("contain", "Cypress blog")

        cy.get(".view-button").eq(0).click()
        cy.get(".view-button").eq(1).click()
        cy.get(".view-button").eq(2).click()

        cy.contains("Cypress blog").find(".like-button").click()
        cy.wait(200)
        cy.contains("Cypress blog").find(".like-button").click()
        cy.wait(200)
        cy.contains("Cypress blog").find(".like-button").click()
        cy.wait(200)

        cy.get(".blog").eq(0).should("contain", "Cypress blog")
        cy.get(".blog").eq(1).should("contain", "Cypress 3 blog")
        cy.get(".blog").eq(2).should("contain", "Cypress 2 blog")
      })
    })
  })

  describe("When multiple users exist", function () {
    beforeEach(function () {
      cy.login({ username: "cypress", password: "cypress" })
      cy.createBlog({
        title: "Cypress blog",
        author: "Cypress",
        url: "www.example.com",
        likes: 0,
      })
      const user = {
        name: "Cypress2",
        username: "cypress2",
        password: "cypress2",
      }
      cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user)
    })

    it("only the creator can see blog delete button", function () {
      cy.contains("view").click()
      cy.get("#remove-blog-button").should("exist")
      cy.contains("logout").click()
      cy.login({ username: "cypress2", password: "cypress2" })
      cy.contains("view").click()
      cy.get("#remove-blog-button").should("not.exist")
    })
  })
})
