import { useState, useEffect, useCallback } from 'react'
import { NearEarthObject, NASAResponse, FilterOptions } from '@/types/nasa'
import { fetchNearEarthObjects, addDays, calculateAverageDiameter } from '@/utils/nasa-api'

interface UseNasaApiResult {
  events: NearEarthObject[]
  loading: boolean
  error: string | null
  loadMore: () => void
  applyFilters: (filters: FilterOptions) => void
  currentFilters: FilterOptions
  hasMore: boolean
}

export const useNasaApi = (): UseNasaApiResult => {
  const [events, setEvents] = useState<NearEarthObject[]>([])
  const [allEvents, setAllEvents] = useState<NearEarthObject[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentDateRange, setCurrentDateRange] = useState({
    start: new Date(),
    end: addDays(new Date(), 7)
  })
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    hazardousOnly: false,
    sortBy: 'date-asc'
  })
  const [hasMore, setHasMore] = useState(true)

  const fetchEvents = useCallback(async (startDate: Date, endDate: Date, append = false) => {
    setLoading(true)
    setError(null)

    try {
      const response: NASAResponse = await fetchNearEarthObjects(startDate, endDate)

      // Flatten the events from all dates
      const newEvents: NearEarthObject[] = []
      Object.values(response.near_earth_objects).forEach(dateEvents => {
        newEvents.push(...dateEvents)
      })

      if (append) {
        setAllEvents(prev => [...prev, ...newEvents])
      } else {
        setAllEvents(newEvents)
      }

      // Check if we have more data available
      setHasMore(newEvents.length > 0)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }, [])

  const applyFilters = useCallback((filters: FilterOptions) => {
    setCurrentFilters(filters)

    let filtered = [...allEvents]

    // Apply hazardous filter
    if (filters.hazardousOnly) {
      filtered = filtered.filter(event => event.is_potentially_hazardous_asteroid)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-asc':
          return new Date(a.close_approach_data[0]?.close_approach_date || '').getTime() - 
                 new Date(b.close_approach_data[0]?.close_approach_date || '').getTime()
        case 'date-desc':
          return new Date(b.close_approach_data[0]?.close_approach_date || '').getTime() - 
                 new Date(a.close_approach_data[0]?.close_approach_date || '').getTime()
        case 'size-asc':
          const sizeA = calculateAverageDiameter(
            a.estimated_diameter.kilometers.estimated_diameter_min,
            a.estimated_diameter.kilometers.estimated_diameter_max
          )
          const sizeB = calculateAverageDiameter(
            b.estimated_diameter.kilometers.estimated_diameter_min,
            b.estimated_diameter.kilometers.estimated_diameter_max
          )
          return sizeA - sizeB
        case 'size-desc':
          const sizeBDesc = calculateAverageDiameter(
            b.estimated_diameter.kilometers.estimated_diameter_min,
            b.estimated_diameter.kilometers.estimated_diameter_max
          )
          const sizeADesc = calculateAverageDiameter(
            a.estimated_diameter.kilometers.estimated_diameter_min,
            a.estimated_diameter.kilometers.estimated_diameter_max
          )
          return sizeBDesc - sizeADesc
        case 'distance-asc':
          return parseFloat(a.close_approach_data[0]?.miss_distance.kilometers || '0') - 
                 parseFloat(b.close_approach_data[0]?.miss_distance.kilometers || '0')
        case 'distance-desc':
          return parseFloat(b.close_approach_data[0]?.miss_distance.kilometers || '0') - 
                 parseFloat(a.close_approach_data[0]?.miss_distance.kilometers || '0')
        default:
          return 0
      }
    })

    setEvents(filtered)
  }, [allEvents])

  const loadMore = useCallback(() => {
    const newStart = addDays(currentDateRange.end, 1)
    const newEnd = addDays(newStart, 7)

    setCurrentDateRange(prev => ({
      start: prev.start,
      end: newEnd
    }))

    fetchEvents(newStart, newEnd, true)
  }, [currentDateRange.end, fetchEvents])

  // Initial load
  useEffect(() => {
    fetchEvents(currentDateRange.start, currentDateRange.end)
  }, [])

  // Apply filters whenever allEvents or filters change
  useEffect(() => {
    applyFilters(currentFilters)
  }, [allEvents, currentFilters, applyFilters])

  return {
    events,
    loading,
    error,
    loadMore,
    applyFilters,
    currentFilters,
    hasMore
  }
}