import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import { fetchData as fetchBoatRamps } from './store/slice/features'
import { store } from './store'

async function start() {
  store.dispatch(fetchBoatRamps())

  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

start()
