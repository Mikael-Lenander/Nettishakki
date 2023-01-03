import { Store } from '@reduxjs/toolkit'

declare global {
  interface Window {
    Cypress: Cypress.Cypress
    store: Store
  }
}
