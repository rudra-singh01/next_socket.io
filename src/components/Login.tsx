"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, TextField, Card, CardContent, Typography } from '@mui/material'

interface LoginProps {
  onLogin: (username: string) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onLogin(username)
    }
  }

  return (
    <Card sx={{ maxWidth: 350, margin: 'auto', marginTop: 8 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            margin="normal"
          />
          <a href="/create">
            <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button></a>
        </form>
      </CardContent>
    </Card>
  )
}