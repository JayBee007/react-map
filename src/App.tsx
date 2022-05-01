import { Provider } from 'react-redux'

import { Layout } from 'src/components/Layout'
import { Map } from 'src/components/Map'
import { BarChart } from 'src/components/DataVis/BarChart'
import { PieChart } from 'src/components/DataVis/PieChart'
import { store } from 'src/store'

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Layout.Sidebar>
          <BarChart />
          <PieChart />
        </Layout.Sidebar>
        <Layout.Main>
          <Map />
        </Layout.Main>
      </Layout>
    </Provider>
  )
}

export default App
