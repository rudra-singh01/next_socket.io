"use client"

import { useState, useEffect } from 'react'
import Login from '@/components/Login'
import Create from '@/components/Create'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setUsername(storedUsername)
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (username: string) => {
    localStorage.setItem('username', username)
    setUsername(username)  // Set username state
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return <Create username={username || ''} onLogout={() => setIsLoggedIn(false)} />
}
