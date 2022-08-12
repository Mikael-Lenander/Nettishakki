import React, { useEffect, useState } from 'react'
import { Typography, TextField, Button, Alert } from '@mui/material'
import { useSocket } from '../hooks/socketContext'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { initializeGame, startGame } from '../state/reducers/gameReducer'
import { Color, Info } from 'shakki'
import { Navigate } from 'react-router-dom'

export default function JoinGameMenu() {
  const socket = useSocket()
  const dispatch = useAppDispatch()
  const game = useAppSelector((state) => state.game)
  const [gameId, setGameId] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string>('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    socket.emit('joinGame', gameId)
  }

  useEffect(() => {
    if (!socket) return
    socket.on('joinedGame', (info: Info, opponentName: string, color: Color, gameId: string) => {
      if (info.success) {
        dispatch(initializeGame({ color, gameId }))
        dispatch(startGame({ opponentName }))
      }
      setErrorMessage(info.message)
    })
    return () => {
      socket.off('joinedGame')
    }
  }, [socket])

  if (game.active) return <Navigate to="/play" />

  return (
    <form style={{ color: 'white', display: 'flex', justifyContent: 'center', flexDirection: 'column' }} onSubmit={handleSubmit} autoComplete="off">
      <Typography variant="h3">Enter game id:</Typography>
      <TextField
        fullWidth
        variant="outlined"
        onChange={(e) => setGameId(e.target.value)}
        style={{ background: 'white', borderRadius: '5px', marginTop: '1.2em', marginBottom: '1.2em' }}
      />
      <Button variant="contained" color="success" style={{ fontSize: '1.5rem', alignSelf: 'center' }} type="submit">
        Join
      </Button>
      {errorMessage && (
        <Alert severity="error" style={{ marginTop: '1em' }}>
          {errorMessage}
        </Alert>
      )}
    </form>
  )
}
