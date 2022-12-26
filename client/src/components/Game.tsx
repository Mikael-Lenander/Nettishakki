import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { useSocket } from '../hooks/socketContext'
import { makeMove, gameOver } from '../state/reducers/gameReducer'
import { Circle, Rect } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { Color, Move, GameOverMessage, Pos, Game as GameLogic } from 'shared'
import Board from './Board'
import InfoBar from './InfoBar'
import GameStatus from './GameStatus'
import { Navigate } from 'react-router-dom'

export default function Game() {
  const { game, user } = useAppSelector(state => state)
  const size = 650
  const squareSize = size / 8
  const socket = useSocket()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!socket || !game.active) return
    socket.on('getMove', (moves: Move[], isCheck: boolean, turn: Color) => {
      dispatch(
        makeMove({
          moves,
          isCheck,
          turn
        })
      )
    })
    socket.on('gameOver', (message: GameOverMessage) => {
      dispatch(gameOver(message))
    })
    return () => {
      socket.off('getMove')
      socket.off('gameOver')
    }
  }, [socket])

  const flip = (pos: Pos): Pos => new Pos(game.color === 'white' ? pos.x : 7 - pos.x, game.color === 'white' ? 7 - pos.y : pos.y)

  const [selectedPos, setSelectedPos] = useState<Pos>()
  const [availabeMoves, setAvailableMoves] = useState<Pos[]>([])

  function handleClickBoard(event: KonvaEventObject<MouseEvent>) {
    if (!game.active) return
    const square = event.target.attrs
    const pos = new Pos(square.col, square.row)
    const piece = game.board[pos.y][pos.x]
    if (game.turn === game.color && selectedPos && pos.in(availabeMoves) && socket) {
      socket.emit('makeMove', selectedPos, pos)
    }
    setSelectedPos(piece && piece.color === game.turn && piece.color === game.color ? pos : null)
  }

  useEffect(() => {
    if (selectedPos) {
      setAvailableMoves(GameLogic.getMoves(game, selectedPos))
      return
    }
    setAvailableMoves([])
  }, [selectedPos])

  if (!game.id) return <Navigate to='/' />

  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: '1em' }}>
      <Board
        size={650}
        board={game.board}
        handleClickBoard={handleClickBoard}
        flip={flip}
        playerColor={game.color}
        componentOnTopOfSquares={
          selectedPos && (
            <Rect
              x={flip(selectedPos).x * squareSize}
              y={flip(selectedPos).y * squareSize}
              width={squareSize}
              height={squareSize}
              fill={'green'}
            />
          )
        }
        componentOnTopOfPieces={availabeMoves.map(move => (
          <Circle
            key={`(${move.x}, ${move.y})`}
            row={move.y}
            col={move.x}
            x={squareSize * (flip(move).x + 0.5)}
            y={squareSize * (flip(move).y + 0.5)}
            fill='grey'
            radius={10}
            onClick={handleClickBoard}
          />
        ))}
      />
      <InfoBar
        whiteName={game.color === 'white' ? user.username : game.opponentName}
        blackName={game.color === 'black' ? user.username : game.opponentName}
        gameOverMessage={game.overMessage}
      >
        <GameStatus />
      </InfoBar>
    </div>
  )
}
