import React, { useState, useMemo, useEffect } from 'react'
import { Stage, Layer, Rect, Circle } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { range } from 'lodash'
import { Game, Pos, GameState } from 'shakki'
import { useSocket } from '../hooks/socketContext'
import ChessImage from './ChessImage'

interface Square {
  id: string
  pos: Pos
  fill: string
}

interface Props {
  game: GameState
}

export default function Board({ game }: Props) {
  const width = 650
  const height = 650
  const squareSize = width / 8
  const radius = 10
  const socket = useSocket()

  const squares = useMemo((): Square[][] => {
    return range(0, 8).map(row =>
      range(0, 8).map(col => ({
        id: `(${col}, ${row})`,
        pos: new Pos(col, row),
        fill: row % 2 === col % 2 ? '#8ca2ad' : '#dee3e6'
      }))
    )
  }, [])

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
      setAvailableMoves(Game.getMoves(game, selectedPos))
      return
    }
    setAvailableMoves([])
  }, [selectedPos])

  return (
    <div style={{ margin: '1em' }}>
      <Stage width={width} height={height}>
        <Layer>
          {squares.map(row =>
            row.map(square => (
              <Rect
                key={square.id}
                col={square.pos.x}
                row={square.pos.y}
                x={flip(square.pos).x * squareSize}
                y={flip(square.pos).y * squareSize}
                width={squareSize}
                height={squareSize}
                fill={square.fill}
                onClick={handleClickBoard}
              />
            ))
          )}
          {selectedPos && (
            <Rect
              x={flip(selectedPos).x * squareSize}
              y={flip(selectedPos).y * squareSize}
              width={squareSize}
              height={squareSize}
              fill={'green'}
            />
          )}
          {game.board.map((row, y) =>
            row.map((piece, x) => {
              if (!piece) return null
              return (
                <ChessImage
                  key={`${x} ${y}`}
                  x={x}
                  y={y}
                  pieceName={piece.name}
                  pieceColor={piece.color}
                  playerColor={game.color}
                  squareSize={squareSize}
                  handleClickBoard={handleClickBoard}
                />
              )
            })
          )}
          {availabeMoves.map(move => (
            <Circle
              key={`(${move.x}, ${move.y})`}
              row={move.y}
              col={move.x}
              x={squareSize * (flip(move).x + 0.5)}
              y={squareSize * (flip(move).y + 0.5)}
              fill='grey'
              radius={radius}
              onClick={handleClickBoard}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
