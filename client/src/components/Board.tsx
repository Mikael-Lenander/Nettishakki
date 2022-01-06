import React, { useState, useMemo, useEffect } from 'react'
import { Stage, Layer, Rect, Circle } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { range } from 'lodash'
import { Game, Pos } from '../chess'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { makeMove } from '../reducers/gameReducer'
import ChessImage from './ChessImage'

interface Square {
  id: string
  row: number,
  col: number,
  fill: string
}

export default function Board() {

  const width = 650
  const height = 650
  const squareSize = width / 8
  const radius = 10
  const game = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()

  const squares = useMemo((): Square[][] => {
    return range(0, 8).map(row => (
      range(0, 8).map(col => ({
        id: `(${col}, ${row})`,
        col: col,
        row: row,
        fill: (row % 2) === (col % 2) ? '#dee3e6' : '#8ca2ad'
      }))
    ))
  }, [])

  const [selectedPos, setSelectedPos] = useState<Pos>()
  const [availabeMoves, setAvailableMoves] = useState<Pos[]>([])
  
  function handleClickBoard(event: KonvaEventObject<MouseEvent>) {
    const square = event.target.attrs
    const pos = new Pos(square.col, square.row)
    const piece = game.board[pos.y][pos.x]
    if (selectedPos && pos.in(availabeMoves)) {
      dispatch(makeMove({
        oldPos: Pos.obj(selectedPos),
        newPos: Pos.obj(pos)
      }))
    }
    setSelectedPos(piece && piece.color === game.turn ? pos : null)
  }
  
  useEffect(() => {
    if (selectedPos) {
      return setAvailableMoves(Game.getMoves(game.board, game.check, selectedPos))
    }
    setAvailableMoves([])
  }, [selectedPos])

  return (
    <Stage width={width} height={height}>
      <Layer>
        {squares.map(row => (
          row.map(square => (
            <Rect
              key={square.id}
              row={square.row}
              col={square.col}
              x={square.col * squareSize}
              y={square.row * squareSize}
              width={squareSize}
              height={squareSize}
              fill={square.fill}
              onClick={handleClickBoard}
            />
          ))
        ))}
        {selectedPos && <>
          <Rect
            x={selectedPos.x * squareSize}
            y={selectedPos.y * squareSize}
            width={squareSize}
            height={squareSize}
            fill={'green'}
          />
          {availabeMoves.map(move => (
            <Circle
              key={`(${move.x}, ${move.y})`}
              row={move.y}
              col={move.x}
              x={squareSize * (move.x + 0.5)}
              y={squareSize * (move.y + 0.5)}
              fill='grey'
              radius={radius}
              onClick={handleClickBoard}
            />
          ))}
        </>}
        {game.board.map((row, y) => (
          row.map((piece, x) => {
            if (!piece) return null
            return <ChessImage
              key={`${x} ${y}`}
              x={x}
              y={y}
              pieceName={piece.name}
              color={piece.color}
              squareSize={squareSize}
              handleClickBoard={handleClickBoard}
            />

          })
        ))}
      </Layer>
    </Stage>
  )
}
