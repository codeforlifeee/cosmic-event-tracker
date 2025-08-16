import React, { useState } from 'react'
import { EventCard } from './EventCard'
import { EventDetail } from './EventDetail'
import { FilterControls } from './FilterControls'
import { LoadMoreButton } from './LoadMoreButton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { useNasaApi } from '@/hooks/useNasaApi'
import { NearEarthObject } from '@/types/nasa'
import { AlertCircle, Rocket } from 'lucide-react'

export const EventList: React.FC = () => {
  const { events, loading, error, loadMore, applyFilters, currentFilters, hasMore } = useNasaApi()
  const [selectedEvent, setSelectedEvent] = useState<NearEarthObject | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const handleEventClick = (event: NearEarthObject) => {
    setSelectedEvent(event)
    setDetailOpen(true)
  }

  const handleDetailClose = (open: boolean) => {
    setDetailOpen(open)
    if (!open) {
      setSelectedEvent(null)
    }
  }

  if (loading && events.length === 0) {
    return (
      <div className="text-center py-12">
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-muted-foreground">Loading cosmic events...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Rocket className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Near-Earth Objects</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track upcoming asteroid and comet approaches to Earth. Data provided by NASA's Near Earth Object Web Service.
        </p>
      </div>

      <FilterControls 
        filters={currentFilters}
        onFiltersChange={applyFilters}
      />

      {events.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌌</div>
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-muted-foreground">
            {currentFilters.hazardousOnly 
              ? "No potentially hazardous asteroids found with current filters."
              : "No Near-Earth Objects found for the selected date range."
            }
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>

          <LoadMoreButton
            onLoadMore={loadMore}
            loading={loading}
            hasMore={hasMore}
          />
        </>
      )}

      <EventDetail
        event={selectedEvent}
        open={detailOpen}
        onOpenChange={handleDetailClose}
      />
    </div>
  )
}