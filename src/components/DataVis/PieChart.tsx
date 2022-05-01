import { useSelector } from 'react-redux'
import { RadialChart } from 'react-vis'
import isEmpty from 'lodash.isempty'

import { selectRampsPerSize } from 'src/store/slice/dataVis'

export function PieChart() {
  const rampsPerSize = useSelector(selectRampsPerSize)

  if (isEmpty(rampsPerSize)) return null

  return (
    <div>
      <p>Ramps per Size</p>
      <div>
        <RadialChart
          // eslint-disable-next-line no-console
          onValueClick={(...args) => console.log('args', args)}
          showLabels
          labelsStyle={{ fontSize: '0.85rem', fill: '#fff' }}
          style={{ strokeWidth: 2, cursor: 'pointer' }}
          data={rampsPerSize}
          width={360}
          height={300}
        />
      </div>
    </div>
  )
}
