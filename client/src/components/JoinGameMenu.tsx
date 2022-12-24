import React, { useEffect, useState } from 'react'
import { Typography, TextField, Button, Alert, Card } from '@mui/material'
import { useSocket } from '../hooks/socketContext'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { initializeGame, startGame } from '../state/reducers/gameReducer'
import { Color, Info } from 'shared'
import { Navigate } from 'react-router-dom'

export default function JoinGameMenu() {
  const socket = useSocket()
  const dispatch = useAppDispatch()
  const game = useAppSelector(state => state.game)
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

  if (game.active) return <Navigate to='/play' />

  return (
    <Card sx={{ padding: '25px 15px 25px 15px', borderRadius: '5px', border: '1px solid black' }}>
      <form style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} onSubmit={handleSubmit} autoComplete='off'>
        <Typography variant='h4'>Enter game id:</Typography>
        <TextField
          variant='outlined'
          size='small'
          onChange={e => setGameId(e.target.value)}
          style={{ marginTop: '1.2em', marginBottom: '1.2em' }}
        />
        <Button variant='contained' color='success' style={{ alignSelf: 'center' }} type='submit'>
          Join
        </Button>
        {errorMessage && (
          <Alert severity='error' style={{ marginTop: '1em' }}>
            {errorMessage}
          </Alert>
        )}
      </form>
    </Card>
  )
}
