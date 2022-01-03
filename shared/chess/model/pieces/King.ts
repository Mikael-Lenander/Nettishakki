import { Color, Direction, PieceName } from "../../types"
import { Piece } from './Piece'
import Pos from '../Pos'
import Board from "../Board"

export class King extends Piece {
  name: PieceName = 'king'
  directions: Direction[] = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
  ]

  constructor(color: Color, x: number, y: number) {
    super(color, x, y)
  }

  validMoves(board: Board): Pos[] {
    const validMoves: Pos[] = []
    this.directions.forEach(direction => {
      const currentPos = this.pos.to(direction)
        if (currentPos.inBounds() && board.pieceAt(currentPos)?.color !== this.color) {
          validMoves.push(currentPos)
        }
    })
    return validMoves
  }
}