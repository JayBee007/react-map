/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

import { fetchBoatRamps } from 'src/api/client'

import { RootState } from 'src/store'

const featuresAdapter = createEntityAdapter()

type Status = 'idle' | 'loading' | 'succeeded' | 'failed'
type Error = string | null | undefined

interface InitialState {
  status: Status
  error: Error
}

const initialState = featuresAdapter.getInitialState<InitialState>({
  status: 'idle',
  error: undefined,
})

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
        featuresAdapter.upsertMany(state, action.payload.features)
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { reducer } = featuresSlice

export const { selectAll: selectAllFeatures } = featuresAdapter.getSelectors((state: RootState) => state.features)
