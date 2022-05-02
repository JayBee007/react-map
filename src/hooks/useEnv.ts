export function useEnv() {
  return {
    MAPBOX_TOKEN: process.env.REACT_APP_MAPBOX_TOKEN,
  }
}
