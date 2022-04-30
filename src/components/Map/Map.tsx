import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactMapGL, { ViewStateChangeEvent } from 'react-map-gl'

import { useEnv } from 'src/hooks/useEnv'
import { mapUpdate, selectMapState } from 'src/store/slice/map'

export function Map() {
  const { MAPBOX_TOKEN } = useEnv()

  const viewport = useSelector(selectMapState)
  const dispatch = useDispatch()

  const handleViewStateChange = useCallback(
    (evt: ViewStateChangeEvent) => {
      dispatch(mapUpdate(evt.viewState))
    },
    [dispatch]
  )

  return (
    <ReactMapGL
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      onMove={handleViewStateChange}
    />
  )
}
