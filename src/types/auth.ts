export interface User {
  id: string
  email?: string
  user_metadata?: {
    [key: string]: any
  }
  app_metadata?: {
    [key: string]: any
  }
  aud: string
  created_at?: string
  updated_at?: string
  email_confirmed_at?: string
  phone_confirmed_at?: string
  confirmed_at?: string
  last_sign_in_at?: string
  role?: string
}

export interface AuthSession {
  access_token: string
  refresh_token: string
  expires_in: number
  expires_at?: number
  token_type: string
  user: User
}

export interface AuthState {
  user: User | null
  session: AuthSession | null
  loading: boolean
  error: string | null
}

export interface AuthContextType {
  user: User | null
  session: AuthSession | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
}