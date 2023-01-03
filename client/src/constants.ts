export const URL =
  process.env.NODE_ENV == 'production'
    ? 'https://nettishakki.herokuapp.com'
    : window.Cypress
    ? 'http://localhost:3002'
    : 'http://localhost:3001'
export const STORAGE_PREFIX = 'chess-'
