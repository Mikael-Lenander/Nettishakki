import { BACKEND_URL } from '../support/commands'

const user = { username: 'test', password: 'test-password' }

describe('When logging in', () => {
  before(() => {
    cy.resetServer()
    cy.createUser(user.username, user.password)
  })

  it('should be able to login with correct credentials and logout', () => {
    cy.login(user.username, user.password)
    cy.url().should('eq', Cypress.config().baseUrl)
    cy.getByTestId('profile-section').contains(user.username)
    cy.getByTestId('navbar-logout-link').click()
    // Asserst that an element with data-testid="navbar-logout-link" is not visible
    cy.get('html').should('not.contain', '[data-testid="navbar-logout-link"]')
    cy.getByTestId('profile-section').contains('guest')
  })
  it('should display correct message when the password is incorrect', () => {
    cy.login(user.username, 'wrongpassword')
    cy.contains('Wrong password')
  })
  it('should display correct message when the username is incorrect', () => {
    cy.login('wrongusername', user.password)
    cy.contains('Invalid username')
    cy.getByTestId('navbar-signup-link').click()
    cy.get('form').should('not.contain.text', 'Invalid username')
  })
})

describe('When signing up', () => {
  beforeEach(() => {
    cy.resetServer()
  })

  it('should be able to sign up with correct credentials', () => {
    cy.signup(user.username, user.password)
    cy.url().should('eq', Cypress.config().baseUrl + 'login')
    cy.get('form').contains('Signup successful')
    cy.getByTestId('navbar-signup-link').click()
    cy.get('form').should('not.contain.text', 'Signup successful')
  })
  it('should display correct message when the username is already taken', () => {
    cy.createUser(user.username, user.password)
    cy.signup(user.username, user.password)
    cy.contains('Username taken')
    cy.getByTestId('navbar-login-link').click()
    cy.get('form').should('not.contain.text', 'Username taken')
  })
})

describe('The login session', () => {
  before(() => {
    cy.resetServer()
    cy.createUser(user.username, user.password)
  })
  beforeEach(() => {
    cy.loginWithApi(user.username, user.password)
  })
  it('should persist after refreshing the access token', () => {
    cy.window()
      .its('store')
      .invoke('getState')
      .then(state => {
        cy.request('POST', BACKEND_URL + '/api/auth/refresh', { refreshToken: state.user.refreshToken }).then(response => {
          cy.window().its('store').invoke('dispatch', { type: 'user/setTokens', payload: response.body })
          cy.intercept(Cypress.config().baseUrl, { middleware: true }, req => {
            req.headers['authorization'] = 'Bearer ' + response.body.accessToken
          })
          cy.isAuthenticated(user.username)
        })
      })
  })
  it('should persist after a page reload', () => {
    cy.visit('/')
    cy.url().should('eq', Cypress.config().baseUrl)
    cy.refresh()
    cy.isAuthenticated(user.username)
  })
})
