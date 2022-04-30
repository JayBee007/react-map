import { configureStore } from '@reduxjs/toolkit'

import { reducer as featuresReducer } from 'src/store/slice/features'
import { reducer as mapStateReducer } from 'src/store/slice/map'

export const store = configureStore({
  reducer: {
    features: featuresReducer,
    map: mapStateReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
