import React from 'react'
import { Color, PieceName } from 'shakki'
import useImage from 'use-image'
import { Image } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'

type Props = {
  x: number,
  y: number,
  pieceColor: Color,
  playerColor: Color,
  pieceName: PieceName,
  squareSize: number,
  handleClickBoard: (event: KonvaEventObject<MouseEvent>) => void
}

export default function ChessImage({ x, y, pieceColor, playerColor, pieceName, squareSize, handleClickBoard }: Props) {

  const [image] = useImage(`/chess_images/${pieceColor}_${pieceName}.png`)
  const xCoord = playerColor === 'white' ? x : 7 - x
  const yCoord = playerColor === 'white' ? 7 - y  : y

  if (!image) return null

  return (
    <Image
      row={y}
      col={x}
      x={xCoord * squareSize + 0.45 * (squareSize - image.width)}
      y={yCoord * squareSize + 0.45 * (squareSize - image.height)}
      image={image}
      onClick={handleClickBoard}
    />
  )
}
