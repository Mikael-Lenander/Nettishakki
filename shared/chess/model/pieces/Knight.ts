import { Color, Direction, PieceName } from "../../types"
import { Piece } from './Piece'
import Pos from "../Pos"
import Board from '../Board'

export class Knight extends Piece {
  name: PieceName = 'knight'
  directions: Direction[] = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: 2 },
  ]

  constructor(color: Color, x: number, y: number) {
    super(color, x, y)
  }

  validMoves(board: Board): Pos[] {
    const validMoves: Pos[] = []
    this.directions.forEach(direction => {
      const currentPos = this.pos.to(direction)
      if (!currentPos.inBounds()) return
      const currentPiece = board.pieceAt(currentPos)
      if (!currentPiece || currentPiece.color !== this.color) {
        validMoves.push(currentPos)
      }
    })
    return validMoves
  }
}