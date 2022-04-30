import axios from 'axios'

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

export async function fetchBoatRamps() {
  return client.get(process.env.REACT_APP_BOAT_RAMPS_URL!)
}
