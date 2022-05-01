/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import { RootState } from 'src/store'

type InitialState = {
  numberOfRampsFilter: number[]
  rampsPerSizeFilter: number[]
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
      const { compare } = action.payload
      if (state.rampsPerSizeFilter.includes(compare)) {
        state.rampsPerSizeFilter = state.rampsPerSizeFilter.filter((val) => val !== compare)
      } else {
        state.rampsPerSizeFilter.push(compare)
      }
    },
  },
})

export const { toggleNumberOfRampsFilter, toggleRampsPerSizeFilter } = filterSlice.actions
export const { reducer } = filterSlice
export const selectNumberOfRampsFilter = (state: RootState) => state.filter.numberOfRampsFilter
export const selectRampsPerSizeFilter = (state: RootState) => state.filter.rampsPerSizeFilter
