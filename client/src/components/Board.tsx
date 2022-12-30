import React, { useMemo } from 'react'
import { range } from 'lodash'
import { SimpleBoard, Color, MovePos } from 'shared'
import ChessImage from './ChessImage'

interface Props {
  size: number
  board: SimpleBoard
  previousMoves?: (MovePos & { pieceId: string })[]
  handleClickBoard?: (event: React.MouseEvent<SVGElement>) => void
  playerColor: Color
  componentOnTopOfSquares?: JSX.Element | JSX.Element[]
  componentOnTopOfPieces?: JSX.Element | JSX.Element[]
  pieceIds?: string[]
}

export default function Board({
  size,
  board,
  previousMoves = [],
  handleClickBoard,
  playerColor,
  componentOnTopOfSquares,
  componentOnTopOfPieces
}: Props) {
  const squareSize = size / 8

  const squares = useMemo(
    () =>
      range(8).map(y =>
        range(8).map(x => {
          return (
            <rect
              key={`${x} ${y}`}
              x={squareSize * x}
              y={squareSize * y}
              width={squareSize}
              height={squareSize}
              fill={(x + y) % 2 === 0 ? '#dee3e6' : '#8ca2ad'}
            ></rect>
          )
        })
      ),
    [squareSize]
  )

  return (
    <div style={{ margin: '1em' }}>
      <svg width={size} height={size} onClick={handleClickBoard}>
        {squares}
        {componentOnTopOfSquares}
        {board.map((row, y) =>
          row.map((piece, x) => {
            if (!piece) return null
            return (
              <ChessImage
                newPos={{ x, y }}
                oldPos={previousMoves.find(move => move.pieceId === piece.id)?.oldPos ?? { x, y }}
                key={piece.id}
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
      </svg>
    </div>
  )
}
