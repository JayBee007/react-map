import { useSelector } from 'react-redux'
import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis'
import isEmpty from 'lodash.isempty'

import { selectNumberOfRamps } from 'src/store/slice/dataVis'

export function BarChart() {
  const numberOfRamps = useSelector(selectNumberOfRamps)

  if (isEmpty(numberOfRamps)) return null

  return (
    <div>
      <p>Number of Ramps</p>
      <div>
        <XYPlot xType="ordinal" width={360} height={300} xDistance={5}>
          <VerticalBarSeries
            style={{ cursor: 'pointer' }}
            // eslint-disable-next-line no-console
            onValueClick={(...args) => console.log('args', args)}
            barWidth={0.5}
            data={numberOfRamps}
          />
          <XAxis title="Ramps" />
          <YAxis title="Number" />
        </XYPlot>
      </div>
    </div>
  )
}
