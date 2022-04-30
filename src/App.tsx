import { Provider } from 'react-redux'

import { store } from './store'

import { Layout } from './components/Layout'
import { Map } from './components/Map'

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Layout.Sidebar>Sidebar</Layout.Sidebar>
        <Layout.Main>
          <Map />
        </Layout.Main>
      </Layout>
    </Provider>
  )
}

export default App
