/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import { RootState } from 'src/store'

const initialState = {
  latitude: -28.0167,
  longitude: 153.4,
  zoom: 10,
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    mapUpdate(state, action) {
      const { latitude, longitude, zoom } = action.payload
      state.latitude = latitude
      state.longitude = longitude
      state.zoom = zoom
    },
  },
})

export const { mapUpdate } = mapSlice.actions
export const { reducer } = mapSlice
export const selectMapState = (state: RootState) => state.map
