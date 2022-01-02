import { Color, Direction } from '../../types'
import Pos from '../Pos'
import Board from '../Board'

export class Piece {
  color: Color
  pos: Pos
  constructor(color: Color, pos: Pos) {
    this.color = color
    this.pos = pos
  }
}

export class LongRangePiece extends Piece {
  directions: Direction[] = []

  constructor(color: Color, pos: Pos) {
    super(color, pos)
  }

  validMoves(board: Board): Pos[] {
    const validMoves: Pos[] = []
    this.directions.forEach(direction => {
      let currentPos = this.pos.to(direction)
      while (currentPos.inBounds() && !board.pieceAt(currentPos)) {
        validMoves.push(currentPos)
        currentPos = currentPos.to(direction)
      }
      const currentPiece = currentPos.inBounds() && board.pieceAt(currentPos)
      if (currentPiece && currentPiece.color !== this.color) {
        validMoves.push(currentPos)
      }
    })
    return validMoves
  }
}