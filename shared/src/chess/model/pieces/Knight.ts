import { Color, Direction, PieceName } from '../types'
import { Piece } from './Piece'
import Pos from '../Pos'
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
    { x: -1, y: 2 }
  ]

  constructor(color: Color, x: number, y: number) {
    super(color, x, y)
  }

  moves(board: Board, sameColorAllowed: boolean): Pos[] {
    const moves: Pos[] = []
    this.directions.forEach((direction) => {
      const currentPos = this.pos.to(direction)
      if (!currentPos.inBounds()) return
      const currentPiece = board.pieceAt(currentPos)
      if (!currentPiece || currentPiece.color !== this.color) {
        moves.push(currentPos)
      }
      sameColorAllowed && moves.push(currentPos)
    })
    return moves
  }

  validMoves(board: Board): Pos[] {
    return this.moves(board, false)
  }

  controlledSquares(board: Board): Pos[] {
    return this.moves(board, true)
  }
}
