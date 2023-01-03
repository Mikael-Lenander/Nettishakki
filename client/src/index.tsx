import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './index.css'
import { store, persistor } from './state/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { injectStore } from './api/auth'
injectStore(store)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

if (window.Cypress) {
  window.store = store
  console.log(window)
}
