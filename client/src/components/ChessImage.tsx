import React from 'react'
import { Color, PieceName, PosType } from 'shared'
import { animated, useSpring } from '@react-spring/web'

type Props = {
  oldPos: PosType
  newPos: PosType
  pieceColor: Color
  playerColor: Color
  pieceName: PieceName
  squareSize: number
  handleClickBoard?: (event: React.MouseEvent<SVGImageElement>) => void
}

export default function ChessImage({ newPos, oldPos, pieceColor, playerColor, pieceName, squareSize, handleClickBoard }: Props) {
  const xCoord = (x: number) => (playerColor === 'white' ? x : 7 - x)
  const yCoord = (y: number) => (playerColor === 'white' ? 7 - y : y)
  const IMG_SIZE = 60
  const imgSize = (IMG_SIZE * squareSize) / 75
  const position = (c: number) => c * squareSize + 0.45 * (squareSize - imgSize)

  const props = useSpring({
    from: { x: position(xCoord(oldPos.x)), y: position(yCoord(oldPos.y)) },
    to: { x: position(xCoord(newPos.x)), y: position(yCoord(newPos.y)) },
    config: { duration: 120 }
  })

  return (
    <animated.image
      {...props}
      width={imgSize}
      height={imgSize}
      href={`/chess_images/${pieceColor}_${pieceName}.png`}
      onClick={handleClickBoard}
    />
  )
}
