import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { useSocket } from '../hooks/socketContext'
import { Color } from 'shared/chess'
import { Info } from 'shared/types'
import { initializeGame, startGame } from '../reducers/gameReducer'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { Navigate } from 'react-router-dom'

export default function Lobby() {

  const game = useAppSelector(state => state.game)
  const socket = useSocket()
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()

  useEffect(() => {
    if (!socket) return
    socket.on('gameCreated', (color: Color, gameId: string) => {
      dispatch(initializeGame({ color, gameId }))
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

  if (!game.id) return <h1 style={{ color: 'white' }}>error</h1>
  if (game.active) return <Navigate to='/play' />

  return (
    <>
      {!game.active &&
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', color: 'white' }}>
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
