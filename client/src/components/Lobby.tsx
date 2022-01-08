import React, { useEffect, useState } from 'react'
import { useSocket } from '../hooks/socketContext'
import { Color } from 'shared/chess'
import { Info } from 'shared/types'
import { initializeGame, startGame } from '../state/reducers/gameReducer'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { Navigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

export default function Lobby() {

  const game = useAppSelector(state => state.game)
  const socket = useSocket()
  const dispatch = useAppDispatch()
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (!socket) return
    socket.on('gameCreated', (info: Info, color: Color, gameId: string) => {
      if (info.success) {
        dispatch(initializeGame({ color, gameId }))
      }
      setErrorMessage(info.message)
    })
    socket.on('joinedGame', (info: Info, opponentName) => {
      if (info.success) {
        dispatch(startGame({ opponentName }))
      }
    })
    return () => {
      socket.off('joinedGame')
      socket.off('gameCreated')
    }
  }, [socket])

  if (game.active) return <Navigate to='/play' />
  return (
    <>
      {errorMessage
        ? <Alert severity='error'>{errorMessage}</Alert>
        : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', color: 'white' }}>
          <Typography variant='h3' component='h1'>
            Your game id: {game.id}
          </Typography>
          <Typography variant='h4' component='h2'>
            Waiting for opponent...
          </Typography>
        </div>
      }
    </>
  )
}
