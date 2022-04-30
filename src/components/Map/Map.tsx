import { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactMapGL, { ViewStateChangeEvent, Source, Layer, MapRef } from 'react-map-gl'

import { useEnv } from 'src/hooks/useEnv'
import { mapUpdate, selectMapState } from 'src/store/slice/map'
import { selectAllFeatures } from 'src/store/slice/features'

export function Map() {
  const { MAPBOX_TOKEN } = useEnv()

  const mapRef = useRef<MapRef>()
  const viewport = useSelector(selectMapState)
  const features = useSelector(selectAllFeatures)

  const dispatch = useDispatch()

  const handleViewStateChange = useCallback(
    (evt: ViewStateChangeEvent) => {
      dispatch(mapUpdate(evt.viewState))
    },
    [dispatch]
  )

  const onMapLoad = useCallback(() => {
    // @ts-ignore
    mapRef.current.on('click', 'boat-ramps', (evt) => {
      // eslint-disable-next-line no-console
      console.log('evt', evt)
      // @ts-ignore
      const feature = mapRef.current.queryRenderedFeatures(evt.point)
      // eslint-disable-next-line no-console
      console.log(feature)
    })
  }, [])

  return (
    <ReactMapGL
      // @ts-ignore
      ref={mapRef}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      onMove={handleViewStateChange}
      onLoad={onMapLoad}
    >
      <Source type="geojson" data={features.data}>
        <Layer
          id="boat-ramps"
          type="circle"
          paint={{
            'circle-color': '#ffff00',
            'circle-radius': 8,
            'circle-stroke-color': '#333333',
            'circle-stroke-width': 2,
          }}
        />
      </Source>
    </ReactMapGL>
  )
}
