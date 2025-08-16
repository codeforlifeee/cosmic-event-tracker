import React, { createContext, useEffect, useState } from 'react'
import { User, AuthSession, AuthContextType } from '@/types/auth'
import { supabase, isSupabaseConfigured } from '@/utils/supabase'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<AuthSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      // For demo purposes, create a mock auth system
      const mockUser = localStorage.getItem('mock_user')
      if (mockUser) {
        try {
          const user = JSON.parse(mockUser)
          setUser(user)
          setSession({
            access_token: 'mock_token',
            refresh_token: 'mock_refresh',
            expires_in: 3600,
            token_type: 'bearer',
            user
          })
        } catch (e) {
          localStorage.removeItem('mock_user')
        }
      }
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setError(null)
    setLoading(true)

    if (!isSupabaseConfigured()) {
      // Mock authentication for demo
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (email && password) {
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          aud: 'authenticated',
          created_at: new Date().toISOString()
        }

        localStorage.setItem('mock_user', JSON.stringify(mockUser))
        setUser(mockUser)
        setSession({
          access_token: 'mock_token',
          refresh_token: 'mock_refresh',
          expires_in: 3600,
          token_type: 'bearer',
          user: mockUser
        })
      } else {
        setError('Please enter email and password')
      }
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const signUp = async (email: string, password: string) => {
    setError(null)
    setLoading(true)

    if (!isSupabaseConfigured()) {
      // Mock sign up for demo
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (email && password.length >= 6) {
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          aud: 'authenticated',
          created_at: new Date().toISOString()
        }

        localStorage.setItem('mock_user', JSON.stringify(mockUser))
        setUser(mockUser)
        setSession({
          access_token: 'mock_token',
          refresh_token: 'mock_refresh',
          expires_in: 3600,
          token_type: 'bearer',
          user: mockUser
        })
      } else {
        setError('Password must be at least 6 characters')
      }
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const signOut = async () => {
    setError(null)

    if (!isSupabaseConfigured()) {
      localStorage.removeItem('mock_user')
      setUser(null)
      setSession(null)
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      setError(error.message)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}