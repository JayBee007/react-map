import { useSelector, useDispatch } from 'react-redux'
import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis'
import isEmpty from 'lodash.isempty'

import { toggleNumberOfRampsFilter } from 'src/store/slice/filter'
import { selectNumberOfRamps } from 'src/store/slice/dataVis'

export function BarChart() {
  const dispatch = useDispatch()
  const numberOfRamps = useSelector(selectNumberOfRamps)

  if (isEmpty(numberOfRamps)) return null

  return (
    <div>
      <p>Number of Ramps</p>
      <div>
        <XYPlot xType="ordinal" width={360} height={300} xDistance={5}>
          <VerticalBarSeries
            style={{ cursor: 'pointer' }}
            onValueClick={(dataPoint) => dispatch(toggleNumberOfRampsFilter(dataPoint))}
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
