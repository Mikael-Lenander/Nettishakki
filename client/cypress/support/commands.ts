/// <reference types="cypress" />

export const BACKEND_URL = 'http://localhost:3002'
/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>
      loginWithApi(username: string, password: string): Chainable<void>
      signup(username: string, password: string): Chainable<void>
      getByTestId(dataTestId: string): Chainable<void>
      createUser(username: string, password: string): Chainable<void>
      resetServer(): Chainable<void>
      getSocketData(): Chainable<void>
      isAuthenticated(username: string): Chainable<void>
      createGame(time: number, increment: number): Chainable<void>
      refresh(): Chainable<void>
    }
  }
}

Cypress.Commands.addAll({
  login(username, password) {
    cy.visit(Cypress.config().baseUrl + 'login')
    cy.get('input[placeholder="username"]').type(username)
    cy.get('input[placeholder="password"]').type(password)
    cy.get('form').contains('Login').click()
  },
  loginWithApi(username, password) {
    cy.visit('/')
    cy.request('POST', BACKEND_URL + '/api/auth/login', { username, password }).then(response => {
      cy.window().its('store').invoke('dispatch', { type: 'users/auth/login/fulfilled', payload: response.body })
      cy.intercept(Cypress.config().baseUrl, { middleware: true }, req => {
        req.headers['authorization'] = 'Bearer ' + response.body.accessToken
      })
    })
    cy.wait(1000)
  },
  signup(username, password) {
    cy.visit(Cypress.config().baseUrl + 'signup')
    cy.get('input[placeholder="username"]').type(username)
    cy.get('input[placeholder="password"]').type(password)
    cy.get('input[placeholder="repeat password"]').type(password)
    cy.get('form').contains('Sign up').click()
  },
  getByTestId(dataTestId: string) {
    return cy.get(`[data-testid="${dataTestId}"]`)
  },
  createUser(username, password) {
    cy.request('POST', BACKEND_URL + '/api/users', { username, password, repeatPassword: password })
  },
  resetServer() {
    cy.request('POST', BACKEND_URL + '/api/testing/reset')
  },
  getSocketData() {
    return cy.request('GET', BACKEND_URL + '/api/testing/sockets')
  },
  refresh() {
    cy.wait(500)
    cy.reload(false)
    cy.wait(500)
  },
  isAuthenticated(username) {
    cy.visit('/')
    cy.wait(1000)
    // cy.url().should('eq', Cypress.config().baseUrl)
    cy.getByTestId('profile-section').contains(username)
    cy.request('GET', BACKEND_URL + '/api/testing/sockets').then(({ body }) => {
      expect(body).to.be.an('array').that.deep.includes({ username: username, isAuthenticated: true })
    })
  },
  createGame(time, increment) {
    cy.visit('/')
    cy.getByTestId('create-game-button').click()
    cy.getByTestId('time-select').find('[role="button"]').click()
    cy.contains('li', time.toString()).click()
    cy.getByTestId('increment-select').find('[role="button"]').click()
    cy.contains('li', increment.toString()).click()
    cy.get('form')
      .contains('Create')
      .click()
      .then(() => {
        const heading = Cypress.$('h1:contains("game id")').text()
        const gameId = heading.slice(heading.length - 4)
        return gameId
      })
  },
  joinGame(gameId) {
    cy.visit('/')
    cy.getByTestId('join-game-button').click()
    cy.get('input[placeholder="game id"]').type(gameId)
    cy.get('form').contains('Join').click()
  }
})

export {}
