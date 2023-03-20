import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'components/App/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import Navigation from 'components/Navigation/Navigation'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Navigation />
    </BrowserRouter>
  </Provider>
)
