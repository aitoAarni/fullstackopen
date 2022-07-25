import { func } from 'prop-types'

describe('Blog app', function() {
    const user = {
        username: 'root',
        name: 'root',
        password: 'root'
    }
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('login').click()
        cy.contains('Username')
        cy.contains('Password')
        cy.get('#login-button').contains('login')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('root')
            cy.get('#login-button').click()
            cy.get('.notification').should('contain', 'Loggedi in')
        })
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('fakeuser')
            cy.get('#password').type('fakepass')
            cy.get('#login-button').click()
            cy.get('.error').should('contain', 'invaliidi kredentiaaali')
        })
    })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/login', { username: 'root', password: 'root' })
                .then(response => {
                    localStorage.setItem('loggedUser', JSON.stringify(response.body))
                })
            cy.visit('http://localhost:3000')
        })

        it('A blog can be created', function() {
            cy.contains('create').click()
            cy.get('#title').type('New Blog')
            cy.get('#author').type('Hurskasen Pena')
            cy.get('#url').type('NotOnline.gov')
            cy.get('#create-blog').click()
            cy.get('body').should('contain', 'New Blog Hurskasen Pena')
        })
    })

    describe('When blog created', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/login', { username: 'root', password: 'root' })
                .then(response => {
                    localStorage.setItem('loggedUser', JSON.stringify(response.body))
                    cy.createBlog({ title: 'Blog', author: 'da Vindshiiiiii', url: 'classified.gov' })
                })
            cy.visit('http://localhost:3000')
        })
        it('A blog can be liked', function() {
            cy.contains('show').click()
            cy.get('.like-button').click()
            cy.contains('likes: 1')
        })
        it('A blog can be deleted', function() {
            cy.contains('show').click()
            cy.contains('remove').click()
            cy.contains('da Vindshiiiiii').should('not.exist')
        })
    })
    describe('Many blogs in database', function() {
        const blog1 = {
            title: 'most',
            author: 'boi',
            url: 'same.gov',
            likes: 4
        }
        const blog2 = {
            title: '2nd most',
            author: 'boi',
            url: 'same.gov',
            likes: 2
        }
        const blog3 = {
            title: 'least',
            author: 'boi',
            url: 'same.gov',
            likes: 1
        }

        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/testing/reset/blogs')
            cy.request('POST', 'http://localhost:3003/api/login', { username: 'root', password: 'root' })
                .then(response => {
                    localStorage.setItem('loggedUser', JSON.stringify(response.body))
                })
            cy.createBlog(blog2)
            cy.createBlog(blog3)
            cy.createBlog(blog1)
            cy.visit('http://localhost:3000')
        })
        it('Blogs are in sorted by likes', function() {
            cy.get('.blog').eq(0).should('contain', 'most')
            cy.get('.blog').eq(1).should('contain', '2nd most')
            cy.get('.blog').eq(2).should('contain', 'least')
        })
    })


})
