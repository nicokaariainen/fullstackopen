describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Cypress",
      username: "cypress",
      password: "cypress"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function() {
    cy.contains("log in to application")
    cy.get("input").length === 2
  })

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("cypress")
      cy.get("#password").type("cypress")
      cy.get("#login-button").click()

      cy.contains("Cypress logged in")
    })

    it("fails with wrong credentials", function() {
      cy.get("#username").type("cypress")
      cy.get("#password").type("kissa")
      cy.get("#login-button").click()

      cy.contains("Wrong credentials")
      cy.get("html").should("not.contain", "Cypress logged in")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.login({ username: "cypress", password: "cypress" })
    })

    it("A blog can be created", function() {
      cy.contains("create new blog").click()
      cy.get("#title").type("Cypress blog")
      cy.get("#author").type("Cypress")
      cy.get("#url").type("www.example.com")
      cy.get("#create-blog-button").click()

      cy.contains("Cypress blog")
    })

    describe("and a blog exists", function() {
      beforeEach(function() {
        cy.createBlog({
          title: "Cypress blog",
          author: "Cypress",
          url: "www.example.com",
          likes: 0
        })
      })

      it("the blog can be liked", function() {
        cy.contains("view").click()
        cy.contains("0 likes")
        cy.contains("like").click()
        cy.contains("1 likes")
      })
    })
  })
})