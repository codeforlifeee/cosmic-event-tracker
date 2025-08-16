export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })
}

export const isToday = (dateString: string): boolean => {
  const date = new Date(dateString)
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

export const isFuture = (dateString: string): boolean => {
  const date = new Date(dateString)
  const now = new Date()
  return date > now
}

export const getDaysFromNow = (dateString: string): number => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}