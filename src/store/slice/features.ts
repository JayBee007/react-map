/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { GeoJSON } from 'geojson'

import { fetchBoatRamps } from 'src/api/client'

import { RootState } from 'src/store'

type Status = 'idle' | 'loading' | 'succeeded' | 'failed'
type Error = string | null | undefined

type Data = GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string | undefined

interface InitialState {
  status: Status
  error: Error
  data?: Data
}

const initialState: InitialState = {
  status: 'idle',
  error: undefined,
  data: {} as Data,
}

export const fetchData = createAsyncThunk('features/boatRamps', async () => {
  const response = await fetchBoatRamps()
  return response.data
})

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { reducer } = featuresSlice

export const selectAllFeatures = (state: RootState) => state.features
