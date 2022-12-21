import React from 'react'
import { Pos } from 'shared'
import { useAppSelector } from '../state/hooks'
import { Navigate, useParams } from 'react-router-dom'
import useBoard from '../hooks/useBoard'
import Board from './Board'
import InfoBar from './InfoBar'

export default function GameReview() {
  const { id: gameId } = useParams()
  const user = useAppSelector(state => state.user)
  const game = user.games.find(game => game.id === parseInt(gameId))
  const { board, nextMove } = useBoard(game)

  const flip = (pos: Pos): Pos =>
    new Pos(game.whiteName === user.username ? pos.x : 7 - pos.x, game.whiteName === user.username ? 7 - pos.y : pos.y)

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
        flip={flip}
        playerColor={game.whiteName === user.username ? 'white' : 'black'}
      />
      <InfoBar
        whiteName={game.whiteName}
        blackName={game.blackName}
        gameOverMessage={{ message: game.overMessage, winner: game.winningColor }}
      />
    </div>
  )
}
