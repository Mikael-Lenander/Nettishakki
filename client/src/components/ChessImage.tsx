import React from 'react'
import { Color, PieceName } from '../chess'
import useImage from 'use-image'
import { Image } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'

type Props = {
  x: number,
  y: number,
  color: Color,
  pieceName: PieceName,
  squareSize: number,
  handleClickBoard: (event: KonvaEventObject<MouseEvent>) => void
}

export default function ChessImage({ x, y, color, pieceName, squareSize, handleClickBoard }: Props) {

  const [image] = useImage(`/chess_images/${color}_${pieceName}.png`)

  return (
    <Image
      row={y}
      col={x}
      x={x * squareSize}
      y={y * squareSize}
      image={image}
    onClick={handleClickBoard}
    />
  )
}
