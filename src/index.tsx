import React from 'react'
import ReactDOM from 'react-dom/client'

import 'src/index.scss'
import App from 'src/App'

import { fetchData as fetchBoatRamps } from 'src/store/slice/features'
import { store } from 'src/store'

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
