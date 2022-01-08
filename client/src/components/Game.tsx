import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { useSocket } from '../hooks/socketContext'
import { makeMove, gameOver } from '../state/reducers/gameReducer'
import { Color, Move } from 'shared/chess'
import Board from './Board'
import InfoBar from './InfoBar'
import { GameOver } from 'shared/types'
import { Navigate } from 'react-router-dom'

export default function Game() {

  const game = useAppSelector(state => state.game)
  const socket = useSocket()
  const dispatch = useAppDispatch()
  const [gameOverMessage, setGameOverMessage] = useState<string>('')

  function formatGameOverMessage(data: GameOver) {
    if (!data.winner) return `draw by ${data.message}`
    return `${data.winner} wins by ${data.message}`
  }

  useEffect(() => {
    if (!socket || !game.active) return
    socket.on('getMove', (moves: Move[], isCheck: boolean, turn: Color) => {
      dispatch(makeMove({
        moves,
        isCheck,
        turn
      }))
    })
    socket.on('gameOver', data => {
      dispatch(gameOver())
      setGameOverMessage(formatGameOverMessage(data))
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
      <InfoBar game={game} gameOverMessage={gameOverMessage}/>
    </div>
  )
}
