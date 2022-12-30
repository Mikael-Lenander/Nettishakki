import React from 'react'
import { useAppSelector } from '../state/hooks'
import { Navigate, useParams } from 'react-router-dom'
import useBoard from '../hooks/useBoard'
import Board from './Board'
import InfoBar from './InfoBar'

export default function GameReview() {
  const { id: gameId } = useParams()
  const user = useAppSelector(state => state.user)
  const games = useAppSelector(state => state.playerStats.games)
  const game = games.find(game => game.id === parseInt(gameId))
  const { board, nextMove, previousMoves } = useBoard(game)

  function handleClickBoard() {
    nextMove()
  }

  if (!game) return <Navigate to='/' />

  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: '1em' }}>
      <Board
        size={650}
        board={board}
        handleClickBoard={handleClickBoard}
        playerColor={game.whiteName === user.username ? 'white' : 'black'}
        previousMoves={previousMoves}
      />
      <InfoBar
        whiteName={game.whiteName}
        blackName={game.blackName}
        gameOverMessage={{ message: game.overMessage, winner: game.winningColor }}
      />
    </div>
  )
}
