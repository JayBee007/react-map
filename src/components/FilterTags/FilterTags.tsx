import { useSelector, useDispatch } from 'react-redux'
import isEmpty from 'lodash.isempty'

import {
  selectNumberOfRampsFilter,
  selectRampsPerSizeFilter,
  toggleRampsPerSizeFilter,
  toggleNumberOfRampsFilter,
} from 'src/store/slice/filter'

import './badge.scss'

function Badge(props: { label: string | number; onClick: () => {} }) {
  const { label, onClick } = props
  return (
    <button className="badge" type="button" onClick={onClick}>
      {label} <span className="badge-cross">X</span>
    </button>
  )
}
export function FilterTags() {
  const dispatch = useDispatch()
  const numberOfRampsFilter = useSelector(selectNumberOfRampsFilter)
  const rampsPerSizeFilter = useSelector(selectRampsPerSizeFilter)

  return (
    <div>
      <div>
        {!isEmpty(numberOfRampsFilter) && (
          <>
            <p>Filtered by number of ramps</p>
            <div className="tags">
              {numberOfRampsFilter.map((filter) => (
                <Badge key={filter} label={filter} onClick={() => dispatch(toggleNumberOfRampsFilter({ x: filter }))} />
              ))}
            </div>
          </>
        )}
      </div>
      <div>
        {!isEmpty(rampsPerSizeFilter) && (
          <>
            <p>Filtered by area of ramps</p>
            <div className="tags">
              {rampsPerSizeFilter.map((filter) => (
                <Badge
                  key={filter}
                  label={`< ${filter}`}
                  onClick={() => dispatch(toggleRampsPerSizeFilter({ compare: filter }))}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
