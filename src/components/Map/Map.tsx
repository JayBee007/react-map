// @ts-ignore
import { useState } from 'react'
// import { useSelector } from 'react-redux'
import ReactMapGL from 'react-map-gl'

// import { selectAllFeatures } from '../../store/slice/features'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiamF5YmVlMDA3IiwiYSI6ImNsMmxtYWVodTBya20zZGwxZTFyY2JqaTQifQ.H8g8PCC65qg3RI30Yj781Q'

export function Map() {
  //   const features = useSelector(selectAllFeatures)

  const [viewport] = useState({
    latitude: -28.0167,
    longitude: 153.4,
    zoom: 10,
  })

  return (
    <ReactMapGL
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v10"
    />
  )
}
