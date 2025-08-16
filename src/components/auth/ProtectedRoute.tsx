import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AuthForm } from './AuthForm'
import { Spinner } from '@/components/ui/spinner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen cosmic-bg star-field flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return <>{children}</>
}