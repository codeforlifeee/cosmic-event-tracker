import React from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { LogOut, Rocket, User } from 'lucide-react'

export const Header: React.FC = () => {
  const { user, signOut } = useAuth()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Rocket className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">🌌 Cosmic Event Tracker</h1>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
          )}

          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}