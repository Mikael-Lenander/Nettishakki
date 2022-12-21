import React, { useMemo } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { range } from 'lodash'
import { Pos, SimpleBoard, Color } from 'shared'
import ChessImage from './ChessImage'

interface Square {
  id: string
  pos: Pos
  fill: string
}

interface Props {
  size: number
  board: SimpleBoard
  handleClickBoard?: (event?: KonvaEventObject<MouseEvent>) => void
  flip?: (pos: Pos) => Pos
  playerColor: Color
  componentOnTopOfSquares?: JSX.Element | JSX.Element[]
  componentOnTopOfPieces?: JSX.Element | JSX.Element[]
}

export default function Board({
  size,
  board,
  handleClickBoard,
  flip = pos => pos,
  playerColor,
  componentOnTopOfSquares,
  componentOnTopOfPieces
}: Props) {
  const squareSize = size / 8

  const squares = useMemo((): Square[][] => {
    return range(0, 8).map(row =>
      range(0, 8).map(col => ({
        id: `(${col}, ${row})`,
        pos: new Pos(col, row),
        fill: row % 2 === col % 2 ? '#8ca2ad' : '#dee3e6'
      }))
    )
  }, [])

  return (
    <div style={{ margin: '1em' }}>
      <Stage width={size} height={size} onClick={handleClickBoard}>
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
          {componentOnTopOfSquares}
          {board.map((row, y) =>
            row.map((piece, x) => {
              if (!piece) return null
              return (
                <ChessImage
                  key={`${x} ${y}`}
                  x={x}
                  y={y}
                  pieceName={piece.name}
                  pieceColor={piece.color}
                  playerColor={playerColor}
                  squareSize={squareSize}
                  handleClickBoard={handleClickBoard}
                />
              )
            })
          )}
          {componentOnTopOfPieces}
        </Layer>
      </Stage>
    </div>
  )
}
