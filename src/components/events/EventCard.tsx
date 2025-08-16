import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NearEarthObject } from '@/types/nasa'
import { calculateAverageDiameter, formatDistance, formatVelocity } from '@/utils/nasa-api'
import { formatDate, getDaysFromNow } from '@/utils/date-utils'
import { cn } from '@/lib/utils'
import { AlertTriangle, Eye, Calendar, Ruler, Zap } from 'lucide-react'

interface EventCardProps {
  event: NearEarthObject
  onClick: () => void
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const closeApproach = event.close_approach_data[0]
  const averageDiameter = calculateAverageDiameter(
    event.estimated_diameter.kilometers.estimated_diameter_min,
    event.estimated_diameter.kilometers.estimated_diameter_max
  )

  const daysFromNow = getDaysFromNow(closeApproach?.close_approach_date || '')
  const isHazardous = event.is_potentially_hazardous_asteroid

  return (
    <Card 
      className={cn(
        "hover:shadow-lg transition-all duration-200 cursor-pointer",
        isHazardous ? "hazardous-glow" : "safe-glow"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold leading-tight">
            {event.name}
          </CardTitle>
          <Badge 
            variant={isHazardous ? "hazardous" : "safe"}
            className="ml-2"
          >
            {isHazardous ? (
              <AlertTriangle className="h-3 w-3 mr-1" />
            ) : null}
            {isHazardous ? "Hazardous" : "Safe"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Approach Date</p>
              <p className="text-muted-foreground">
                {formatDate(closeApproach?.close_approach_date || '')}
                {daysFromNow >= 0 && (
                  <span className="block text-xs">
                    {daysFromNow === 0 ? 'Today' : `In ${daysFromNow} days`}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Diameter</p>
              <p className="text-muted-foreground">
                {averageDiameter >= 1 
                  ? `${averageDiameter.toFixed(2)} km`
                  : `${(averageDiameter * 1000).toFixed(0)} m`
                }
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Velocity</p>
              <p className="text-muted-foreground">
                {formatVelocity(closeApproach?.relative_velocity.kilometers_per_hour || '0')}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-blue-500 flex-shrink-0" />
            <div>
              <p className="font-medium">Distance</p>
              <p className="text-muted-foreground">
                {formatDistance(closeApproach?.miss_distance.kilometers || '0')}
              </p>
            </div>
          </div>
        </div>

        <Button variant="ghost" size="sm" className="w-full mt-3">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}