describe ('Blog app', function () {

  const exampleUser = {
    username: 'testaajatestaaja',
    password: 'salainentestaaja',
    name: 'testaaja testaaja'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', exampleUser)
    cy.visit('http://localhost:3000')
  })

  it ('Login form shown as default', function () {
    cy.get('#loginDiv')
  })

  describe('Login', function () {
    it ('login succeeds with correct credintials', function () {
      cy.get('#username').type(exampleUser.username)
      cy.get('#pass').type(exampleUser.password)
      cy.get('#submit').click()

      cy.get('#loggedInView')
    })

    it ('login fails with wrong credintials', function () {
      cy.get('#username').type(exampleUser.username + "!!!!")
      cy.get('#pass').type(exampleUser.password + "!!!!")

      cy.get('#submit').click()
      cy.get('#failedMessage')
    })
  })

  describe('When logged in', function () {

    const exampleUser = {
      username: 'testaajatestaaja',
      password: 'salainentestaaja',
      name: 'testaaja testaaja'
    }

    const exampleBlog = {
      title: 'blog title 1',
      author: 'blog title 2',
      url: 'blog url 3'
    }

    beforeEach(function () {
      cy.request('POST', 'http://localhost:3000/api/login', {
        'username': exampleUser.username,
        'password': exampleUser.password
      }).then(response => {
        localStorage.setItem('loggedInUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it ('you can create a new blog', function () {
      cy.contains('new note').click()

      cy.get('#titleinput').type(exampleBlog.title)
      cy.get('#authorinput').type(exampleBlog.author)
      cy.get('#urlinput').type(exampleBlog.url)

      cy.get('#createButton').click()

      cy.contains(exampleBlog.title)
      cy.contains(exampleBlog.author)
    })

    it ('you can like a blog', function () {
      cy.contains('view').click()
      cy.contains('like').click()
    })

    it ('you can remove a post', function () {
      cy.contains('view').click()
      cy.contains('remove').click()
    })
    
  })
})