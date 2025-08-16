import React from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen cosmic-bg">
      <Header />
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  )
}