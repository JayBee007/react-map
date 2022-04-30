import axios from 'axios'

const BASE_URL = 'https://raw.githubusercontent.com/JRGranell/javascript-challenge/'

const BOAT_RAMPS_URL = 'master/data/boat_ramps.geojson'

const client = axios.create({
  baseURL: BASE_URL,
})

export async function fetchBoatRamps() {
  return client.get(BOAT_RAMPS_URL)
}
