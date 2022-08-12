import { Color, Direction, PieceName } from '../types'
import { Piece } from './Piece'
import Pos from '../Pos'
import Board from '../Board'
import { opponent } from '../utils'
import { LongRangePiece } from '.'

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
    { x: -1, y: 1 }
  ]

  constructor(color: Color, x: number, y: number) {
    super(color, x, y)
  }

  isCastleMove(move: Pos): boolean {
    return this.pos.distance(move) >= 2
  }

  validMoves(board: Board): Pos[] {
    const validMoves: Pos[] = []
    this.directions.forEach((direction) => {
      const currentPos = this.pos.to(direction)
      if (currentPos.inBounds() && board.pieceAt(currentPos)?.color !== this.color) {
        validMoves.push(currentPos)
      }
    })
    // Linna
    const initialSquare = this.color === 'white' ? new Pos(4, 0) : new Pos(4, 7)
    const initialRookSquares = this.color === 'white' ? [new Pos(0, 0), new Pos(7, 0)] : [new Pos(0, 7), new Pos(7, 7)]
    initialRookSquares.forEach((initialRookSquare) => {
      if (
        this.pos.equals(initialSquare) &&
        board.moves.every((move) => !move.oldPos.in([initialSquare, initialRookSquare])) &&
        initialSquare.squaresBetween(initialRookSquare).every((square) => board.isEmptySquare(square))
      ) {
        validMoves.push(new Pos(initialRookSquare.x === 7 ? 6 : 2, initialSquare.y))
      }
    })
    return validMoves
  }

  legalMoves(board: Board): Pos[] {
    const opponentControlledSquares = board.controlledSquares(opponent(this.color))
    return this.validMoves(board)
      .filter((move) => !move.in(opponentControlledSquares))
      .filter((move) => {
        if (this.isCastleMove(move)) {
          const castleSquares = this.pos.squaresBetween(move).concat(this.pos)
          return castleSquares.every((square) => !square.in(opponentControlledSquares))
        }
        return true
      })
  }

  validMovesInCheck(board: Board): Pos[] {
    const validMoves = this.legalMoves(board)
    const illegalMoves: Pos[] = []
    board.kingAttackingPieces(opponent(this.color)).forEach((piece) => {
      if (piece instanceof LongRangePiece && piece.pos.inContactWith(this.pos)) {
        const squareBehindKing = this.pos.to(piece.pos.directionTo(this.pos))
        illegalMoves.push(squareBehindKing)
      }
    })
    return validMoves.filter((move) => !move.in(illegalMoves))
  }

  controlledSquares(board: Board): Pos[] {
    return this.validMoves(board)
  }
}
