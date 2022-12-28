import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { useSocket } from '../hooks/socketContext'
import { makeMove, gameOver, setTimers } from '../state/reducers/gameReducer'
import { Circle, Rect } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { Color, Move, GameOverMessage, Pos, Game as GameLogic, TimeLeft } from 'shared'
import Board from './Board'
import InfoBar from './InfoBar'
import GameStatus from './GameStatus'
import { Navigate } from 'react-router-dom'
import useTimer from '../hooks/useTimer'

export default function Game() {
  const { game, user } = useAppSelector(state => state)
  const size = 650
  const squareSize = size / 8
  const socket = useSocket()
  const dispatch = useAppDispatch()

  useTimer()

  useEffect(() => {
    if (!socket || !game.active) return
    socket.on('moveMade', (moves: Move[], isCheck: boolean, turn: Color, timeLeft: TimeLeft, date: number) => {
      const delay = Math.max(Date.now() - date, 0)
      dispatch(makeMove({ moves, isCheck, turn, timeLeft, delay }))
      if (turn !== game.color) socket.emit('addDelayToTimer', delay)
    })
    socket.on('gameOver', (overMessage: GameOverMessage, timeLeft: TimeLeft) => {
      dispatch(gameOver({ overMessage, timeLeft }))
    })
    socket.on('getTime', (timeLeft: TimeLeft) => {
      dispatch(setTimers(timeLeft))
    })
    return () => {
      socket.off('moveMade')
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
      socket.emit('makeMove', selectedPos, pos, Date.now())
    }
    setSelectedPos(piece && piece.color === game.turn && piece.color === game.color ? pos : null)
  }

  useEffect(() => {
    if (selectedPos) {
      return setAvailableMoves(GameLogic.getMoves(game, selectedPos))
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
          selectedPos &&
          game.active && (
            <Rect
              x={flip(selectedPos).x * squareSize}
              y={flip(selectedPos).y * squareSize}
              width={squareSize}
              height={squareSize}
              fill={'green'}
            />
          )
        }
        componentOnTopOfPieces={
          game.active &&
          availabeMoves.map(move => (
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
          ))
        }
      />
      <InfoBar
        whiteName={game.color === 'white' ? user.username : game.opponentName}
        blackName={game.color === 'black' ? user.username : game.opponentName}
        gameOverMessage={game.overMessage}
        upperTime={game.color === 'white' ? game.timeLeft.black : game.timeLeft.white}
        lowerTime={game.color === 'white' ? game.timeLeft.white : game.timeLeft.black}
        hasTurn={game.turn === game.color}
      >
        <GameStatus />
      </InfoBar>
    </div>
  )
}
