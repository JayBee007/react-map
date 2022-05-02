import { configureStore } from '@reduxjs/toolkit'

import { reducer as featuresReducer } from 'src/store/slice/features'
import { reducer as mapStateReducer } from 'src/store/slice/map'
import { reducer as dataVisReducer } from 'src/store/slice/dataVis'
import { reducer as filterReducer } from 'src/store/slice/filter'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['dataVis/visUpdate', 'filter/toggleNumberOfRampsFilter'],
      },
    }),
  reducer: {
    features: featuresReducer,
    map: mapStateReducer,
    dataVis: dataVisReducer,
    filter: filterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
