/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

import { fetchBoatRamps } from '../../api/client'

const featuresAdapter = createEntityAdapter()

const initialState = featuresAdapter.getInitialState({
  status: 'idle',
  error: null,
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
        // @ts-ignore
        state.error = action.error.message
      })
  },
})

export const { reducer } = featuresSlice
