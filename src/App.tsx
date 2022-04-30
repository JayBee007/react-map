import { Provider } from 'react-redux'

import { Layout } from 'src/components/Layout'
import { Map } from 'src/components/Map'
import { store } from 'src/store'

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
