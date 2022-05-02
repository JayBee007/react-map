/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import mapboxgl from 'mapbox-gl'
import isEmpty from 'lodash.isempty'

import { RootState } from 'src/store'

interface NumberOfRamps {
  x: string
  y: number
}

interface RampsPerSize {
  angle: number
  totalRamps: number
  label: string
}

type InitialState = {
  numberOfRamps: NumberOfRamps[]
  rampsPerSize: RampsPerSize[]
}

const initialState: InitialState = {
  numberOfRamps: [],
  rampsPerSize: [],
}

const AREAS = [50, 200, 526]

function getDataForVis(features: mapboxgl.MapboxGeoJSONFeature[]): [NumberOfRamps[], RampsPerSize[]] {
  const numberOfRampsResult: NumberOfRamps[] = []
  const rampsPerSizeResult: RampsPerSize[] = [
    {
      label: '[0,50]',
      angle: 0,
      totalRamps: 0,
    },
    {
      label: '[50,200]',
      angle: 0,
      totalRamps: 0,
    },
    {
      label: '[200,526]',
      angle: 0,
      totalRamps: 0,
    },
  ]
  if (isEmpty(features)) {
    return [numberOfRampsResult, []]
  }
  const totalFeatures = features.length
  const ramps = new Map<string, number>()

  features.forEach((feature) => {
    const material = feature?.properties!.material
    const number = feature?.properties!.number_lan
    if (ramps.has(material)) {
      ramps.set(material, ramps.get(material)! + number)
    } else {
      ramps.set(material, number)
    }

    // eslint-disable-next-line no-underscore-dangle
    const area = feature?.properties!.area_

    for (let i = 0; i < AREAS.length; i += 1) {
      if (area < AREAS[i]) {
        const currentTotal = rampsPerSizeResult[i].totalRamps
        rampsPerSizeResult[i].totalRamps = currentTotal + 1
        break
      }
    }
  })

  // eslint-disable-next-line no-restricted-syntax
  for (const [k, v] of ramps.entries()) {
    numberOfRampsResult.push({ x: k, y: v })
  }

  for (let i = 0; i < rampsPerSizeResult.length; i += 1) {
    const currentTotal = rampsPerSizeResult[i].totalRamps
    rampsPerSizeResult[i].angle = (currentTotal / totalFeatures) * 360
  }

  return [numberOfRampsResult, rampsPerSizeResult]
}

const dataVisSlice = createSlice({
  name: 'dataVis',
  initialState,
  reducers: {
    visUpdate(state, action) {
      const [numberOfRampsResult, rampsPerSizeResult] = getDataForVis(action.payload)
      state.numberOfRamps = numberOfRampsResult
      state.rampsPerSize = rampsPerSizeResult
    },
  },
})

export const { visUpdate } = dataVisSlice.actions
export const { reducer } = dataVisSlice
export const selectNumberOfRamps = (state: RootState) => state.dataVis.numberOfRamps
export const selectRampsPerSize = (state: RootState) => state.dataVis.rampsPerSize
