import React from 'react'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Layout } from '@/components/layout/Layout'
import { EventList } from '@/components/events/EventList'

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Layout>
          <EventList />
        </Layout>
      </ProtectedRoute>
    </AuthProvider>
  )
}

export default App