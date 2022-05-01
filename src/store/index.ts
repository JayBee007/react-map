import { configureStore } from '@reduxjs/toolkit'

import { reducer as featuresReducer } from 'src/store/slice/features'
import { reducer as mapStateReducer } from 'src/store/slice/map'
import { reducer as dataVisReducer } from 'src/store/slice/dataVis'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['dataVis/visUpdate'],
      },
    }),
  reducer: {
    features: featuresReducer,
    map: mapStateReducer,
    dataVis: dataVisReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
