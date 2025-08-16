import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FilterOptions } from '@/types/nasa'
import { Filter, AlertTriangle, Shield } from 'lucide-react'

interface FilterControlsProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
}

export const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFiltersChange }) => {
  const toggleHazardousFilter = () => {
    onFiltersChange({
      ...filters,
      hazardousOnly: !filters.hazardousOnly
    })
  }

  const handleSortChange = (value: string) => {
    onFiltersChange({
      ...filters,
      sortBy: value as FilterOptions['sortBy']
    })
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Filter className="h-5 w-5 mr-2" />
          Filters & Sorting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Hazardous Filter */}
          <div className="flex items-center space-x-2">
            <Button
              variant={filters.hazardousOnly ? "default" : "outline"}
              size="sm"
              onClick={toggleHazardousFilter}
              className="flex items-center"
            >
              {filters.hazardousOnly ? (
                <AlertTriangle className="h-4 w-4 mr-2" />
              ) : (
                <Shield className="h-4 w-4 mr-2" />
              )}
              {filters.hazardousOnly ? "Hazardous Only" : "All Objects"}
            </Button>
          </div>

          {/* Sort Select */}
          <div className="flex items-center space-x-2 flex-1 sm:flex-initial">
            <label htmlFor="sort-select" className="text-sm font-medium whitespace-nowrap">
              Sort by:
            </label>
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]" id="sort-select">
                <SelectValue placeholder="Select sorting..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-asc">Date (Earliest)</SelectItem>
                <SelectItem value="date-desc">Date (Latest)</SelectItem>
                <SelectItem value="size-asc">Size (Smallest)</SelectItem>
                <SelectItem value="size-desc">Size (Largest)</SelectItem>
                <SelectItem value="distance-asc">Distance (Closest)</SelectItem>
                <SelectItem value="distance-desc">Distance (Farthest)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters */}
          {(filters.hazardousOnly || filters.sortBy !== 'date-asc') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFiltersChange({
                hazardousOnly: false,
                sortBy: 'date-asc'
              })}
            >
              Reset
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}