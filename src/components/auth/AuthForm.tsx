import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/hooks/useAuth'
import { AlertCircle, Rocket } from 'lucide-react'

export const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signUp, loading, error, clearError } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (isSignUp) {
      await signUp(email, password)
    } else {
      await signIn(email, password)
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    clearError()
    setEmail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen cosmic-bg star-field flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-primary mr-2" />
            <CardTitle className="text-2xl font-bold">🌌 Cosmic Event Tracker</CardTitle>
          </div>
          <CardDescription>
            {isSignUp ? 'Create an account to track Near-Earth Objects' : 'Sign in to explore cosmic events'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center">
                  <Spinner size="sm" className="mr-2" />
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={toggleMode}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              disabled={loading}
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>

          <div className="mt-6 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              Demo Mode: Use any email and password (6+ characters) to explore the app
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}