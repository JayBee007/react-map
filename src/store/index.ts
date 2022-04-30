import { configureStore } from '@reduxjs/toolkit'

import { reducer as featuresReducer } from './slice/features'

export const store = configureStore({
  reducer: {
    features: featuresReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
