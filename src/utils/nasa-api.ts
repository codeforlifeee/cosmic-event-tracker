import { NASAResponse } from '@/types/nasa'
//import { FilterOptions } from '@/types/nasa';

const NASA_API_BASE = 'https://api.nasa.gov/neo/rest/v1'
const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const fetchNearEarthObjects = async (
  startDate: Date,
  endDate: Date
): Promise<NASAResponse> => {
  const start = formatDate(startDate)
  const end = formatDate(endDate)

  const url = `${NASA_API_BASE}/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Invalid API key. Please check your NASA API key configuration.')
      }
      if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.')
      }
      throw new Error(`NASA API error: ${response.status} ${response.statusText}`)
    }

    const data: NASAResponse = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to fetch Near-Earth Objects data')
  }
}

export const calculateAverageDiameter = (
  min: number,
  max: number
): number => {
  return (min + max) / 2
}

export const formatDistance = (kilometers: string): string => {
  const km = parseFloat(kilometers)
  if (km > 1000000) {
    return `${(km / 1000000).toFixed(2)}M km`
  }
  if (km > 1000) {
    return `${(km / 1000).toFixed(0)}K km`
  }
  return `${km.toFixed(0)} km`
}

export const formatVelocity = (kmPerHour: string): string => {
  const speed = parseFloat(kmPerHour)
  return `${speed.toFixed(0)} km/h`
}