/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import { RootState } from 'src/store'

type InitialState = {
  numberOfRampsFilter: string[]
  rampsPerSizeFilter: string[]
}

export const AREA_COMPARISON = {
  '[0,50]': {
    gt: 0,
    lt: 50,
  },
  '[50,200]': {
    gt: 50,
    lt: 200,
  },
  '[200,526]': {
    gt: 200,
    lt: 526,
  },
}

const initialState: InitialState = {
  numberOfRampsFilter: [],
  rampsPerSizeFilter: [],
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleNumberOfRampsFilter(state, action) {
      const { x } = action.payload
      if (state.numberOfRampsFilter.includes(x)) {
        state.numberOfRampsFilter = state.numberOfRampsFilter.filter((val) => val !== x)
      } else {
        state.numberOfRampsFilter.push(x)
      }
    },
    toggleRampsPerSizeFilter(state, action) {
      const { label } = action.payload
      if (state.rampsPerSizeFilter.includes(label)) {
        state.rampsPerSizeFilter = state.rampsPerSizeFilter.filter((val) => val !== label)
      } else {
        state.rampsPerSizeFilter.push(label)
      }
    },
  },
})

export const { toggleNumberOfRampsFilter, toggleRampsPerSizeFilter } = filterSlice.actions
export const { reducer } = filterSlice
export const selectNumberOfRampsFilter = (state: RootState) => state.filter.numberOfRampsFilter
export const selectRampsPerSizeFilter = (state: RootState) => state.filter.rampsPerSizeFilter
