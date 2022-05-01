import { useCallback, useRef, MutableRefObject } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactMapGL, { ViewStateChangeEvent, Source, Layer, MapRef } from 'react-map-gl'
import isEmpty from 'lodash.isempty'

import { useEnv } from 'src/hooks/useEnv'
import { mapUpdate, selectMapState } from 'src/store/slice/map'
import { selectAllFeatures } from 'src/store/slice/features'
import { visUpdate } from 'src/store/slice/dataVis'

const BOAT_RAMPS_LINE = 'boat-ramps-line'
const BOAT_RAMPS_CIRCLE = 'boat-ramps-circle'

function getVisibleFeatuers(mapRef: MutableRefObject<MapRef | undefined>) {
  const visibleLineFeatures = mapRef?.current!.queryRenderedFeatures(undefined, { layers: [BOAT_RAMPS_LINE] })
  const visibleCircleFeatures = mapRef?.current!.queryRenderedFeatures(undefined, { layers: [BOAT_RAMPS_CIRCLE] })

  return isEmpty(visibleCircleFeatures) ? visibleLineFeatures : visibleCircleFeatures
}

export function Map() {
  const { MAPBOX_TOKEN } = useEnv()

  const mapRef = useRef<MapRef>()
  const viewport = useSelector(selectMapState)
  const features = useSelector(selectAllFeatures)

  const dispatch = useDispatch()

  const handleViewStateChange = useCallback(
    (evt: ViewStateChangeEvent) => {
      dispatch(mapUpdate(evt.viewState))

      const visibleFeatures = getVisibleFeatuers(mapRef)
      dispatch(visUpdate(visibleFeatures))
    },
    [dispatch]
  )

  const onMapLoad = useCallback(() => {
    const visibleFeatures = getVisibleFeatuers(mapRef)
    dispatch(visUpdate(visibleFeatures))
  }, [dispatch])

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
          minzoom={16}
          id={BOAT_RAMPS_LINE}
          type="fill"
          paint={{
            'fill-color': 'purple',
          }}
        />
        <Layer
          maxzoom={16}
          id={BOAT_RAMPS_CIRCLE}
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
