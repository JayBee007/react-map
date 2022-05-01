/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import { RootState } from 'src/store'

type InitialState = {
  numberOfRampsFilter: Record<number, boolean>
}

const initialState: InitialState = {
  numberOfRampsFilter: {},
  //   rampsPerSizeFilter: [],
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleNumberOfRampsFilter(state, action) {
      const { x } = action.payload
      if (state.numberOfRampsFilter[x]) {
        state.numberOfRampsFilter[x] = false
      } else {
        state.numberOfRampsFilter[x] = true
      }
    },
  },
})

export const { toggleNumberOfRampsFilter } = filterSlice.actions
export const { reducer } = filterSlice
export const selectNumberOfRampsFilter = (state: RootState) =>
  Object.keys(state.filter.numberOfRampsFilter).filter((k) => state.filter.numberOfRampsFilter[k as unknown as number])
// export const selectRampsPerSizeFilter = (state: RootState) => state.filter.rampsPerSizeFilter
