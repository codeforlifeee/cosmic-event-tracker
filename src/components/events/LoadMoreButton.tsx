import React from 'react'
import { Button } from '@/components/ui/button'
//import { Spinner } from '@/components/ui/spinner'
import { ChevronDown, Loader2 } from 'lucide-react'

interface LoadMoreButtonProps {
  onLoadMore: () => void
  loading: boolean
  hasMore: boolean
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ 
  onLoadMore, 
  loading, 
  hasMore 
}) => {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No more events to load</p>
      </div>
    )
  }

  return (
    <div className="text-center py-6">
      <Button 
        onClick={onLoadMore} 
        disabled={loading}
        variant="outline"
        size="lg"
        className="min-w-[200px]"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Loading more events...
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-2" />
            Load More Events
          </>
        )}
      </Button>
    </div>
  )
}