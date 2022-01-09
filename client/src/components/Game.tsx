import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { useSocket } from '../hooks/socketContext'
import { makeMove, gameOver } from '../state/reducers/gameReducer'
import { Color, Move, GameOverMessage } from 'shakki'
import Board from './Board'
import InfoBar from './InfoBar'
import { Navigate } from 'react-router-dom'

export default function Game() {

  const game = useAppSelector(state => state.game)
  const socket = useSocket()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!socket || !game.active) return
    socket.on('getMove', (moves: Move[], isCheck: boolean, turn: Color) => {
      dispatch(makeMove({
        moves,
        isCheck,
        turn
      }))
    })
    socket.on('gameOver', (message: GameOverMessage) => {
      dispatch(gameOver(message))
    })
    return () => {
      socket.off('getMove')
      socket.off('gameOver')
    }
  }, [socket])

  if (!game.id) return <Navigate to='/' />

  return (
    <div style={{display: 'flex', flexDirection: 'row', margin: '1em'}}>
      <Board game={game} />
      <InfoBar game={game}/>
    </div>
  )
}
