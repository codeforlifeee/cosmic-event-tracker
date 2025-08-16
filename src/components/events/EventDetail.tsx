import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NearEarthObject } from '@/types/nasa'
import { calculateAverageDiameter, formatDistance, formatVelocity } from '@/utils/nasa-api'
import { formatDateTime } from '@/utils/date-utils'
import { AlertTriangle, ExternalLink, Calendar, Ruler, Zap, Target, Globe } from 'lucide-react'

interface EventDetailProps {
  event: NearEarthObject | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, open, onOpenChange }) => {
  if (!event) return null

  const closeApproach = event.close_approach_data[0]
  const averageDiameter = calculateAverageDiameter(
    event.estimated_diameter.kilometers.estimated_diameter_min,
    event.estimated_diameter.kilometers.estimated_diameter_max
  )
  const isHazardous = event.is_potentially_hazardous_asteroid

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-bold pr-8">
                {event.name}
              </DialogTitle>
              <DialogDescription className="mt-1">
                Near-Earth Object Details
              </DialogDescription>
            </div>
            <Badge 
              variant={isHazardous ? "hazardous" : "safe"}
              className="ml-2"
            >
              {isHazardous ? (
                <AlertTriangle className="h-3 w-3 mr-1" />
              ) : null}
              {isHazardous ? "Potentially Hazardous" : "Safe"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Closest Approach</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDateTime(closeApproach?.close_approach_date_full || '')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Ruler className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Estimated Diameter</p>
                  <p className="text-sm text-muted-foreground">
                    {averageDiameter >= 1 
                      ? `${averageDiameter.toFixed(3)} km`
                      : `${(averageDiameter * 1000).toFixed(0)} meters`
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Range: {event.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)} - {event.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)} km
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Relative Velocity</p>
                  <p className="text-sm text-muted-foreground">
                    {formatVelocity(closeApproach?.relative_velocity.kilometers_per_hour || '0')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {parseFloat(closeApproach?.relative_velocity.kilometers_per_second || '0').toFixed(2)} km/s
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Miss Distance</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistance(closeApproach?.miss_distance.kilometers || '0')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {parseFloat(closeApproach?.miss_distance.lunar || '0').toFixed(2)} lunar distances
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Additional Information
            </h4>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">NEO Reference ID:</span>
                <span className="font-mono">{event.neo_reference_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Orbiting Body:</span>
                <span>{closeApproach?.orbiting_body || 'Earth'}</span>
              </div>
              {event.orbital_data && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">First Observed:</span>
                    <span>{event.orbital_data.first_observation_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Observed:</span>
                    <span>{event.orbital_data.last_observation_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Orbit Uncertainty:</span>
                    <span>{event.orbital_data.orbit_uncertainty}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* NASA JPL Link */}
          <div className="border-t pt-4">
            <Button asChild variant="outline" className="w-full">
              <a 
                href={event.nasa_jpl_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on NASA JPL Database
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}