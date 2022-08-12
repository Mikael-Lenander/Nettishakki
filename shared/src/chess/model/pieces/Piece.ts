import { Color, Direction, PieceName, SimplePiece } from '../types'
import Pos from '../Pos'
import Board from '../Board'
import { opponent } from '../utils'
import { Pawn, Bishop, Queen, Rook, King, Knight } from '.'

export abstract class Piece {
  abstract name: PieceName
  color: Color
  pos: Pos
  constructor(color: Color, x: number, y: number) {
    this.color = color
    this.pos = new Pos(x, y)
  }

  isOpponentPiece(piece: Piece): boolean {
    return this.color !== piece.color
  }

  abstract validMoves(board: Board): Pos[]

  abstract controlledSquares(board: Board): Pos[]

  validMovesInCheck(board: Board): Pos[] {
    const kingPos: Pos = board.kingPosition(this.color)
    const kingAttackingPieces = board.kingAttackingPieces(opponent(this.color))
    if (kingAttackingPieces.length > 1) return []
    const kingAttackingPiece = kingAttackingPieces[0]
    const captureMove = (pos: Pos) => pos.equals(kingAttackingPiece.pos)
    const squaresBetween = kingPos.squaresBetween(kingAttackingPiece.pos)
    switch (kingAttackingPiece.name) {
      case 'knight':
      case 'pawn':
        return this.validMoves(board).filter((pos) => captureMove(pos))
      case 'queen':
      case 'rook':
      case 'bishop':
        return this.validMoves(board).filter((pos) => captureMove(pos) || pos.in(squaresBetween))
      default:
        return []
    }
  }

  validMovesOnPin(board: Board, pinnningPiece: Piece): Pos[] {
    const squaresBetween = this.pos.squaresBetween(pinnningPiece.pos)
    return this.validMoves(board).filter((pos) => pos.equals(pinnningPiece.pos) || pos.in(squaresBetween))
  }

  static toFullImplementation(piece: SimplePiece, x: number, y: number): Piece {
    const constructors = {
      pawn: Pawn,
      bishop: Bishop,
      rook: Rook,
      queen: Queen,
      king: King,
      knight: Knight
    }
    return new constructors[piece.name](piece.color, x, y) as Piece //eslint-disable-line
  }
}

export abstract class LongRangePiece extends Piece {
  abstract directions: Direction[]

  constructor(color: Color, x: number, y: number) {
    super(color, x, y)
  }

  moves(board: Board, sameColorAllowed: boolean): Pos[] {
    const moves: Pos[] = []
    this.directions.forEach((direction) => {
      let currentPos = this.pos.to(direction)
      while (currentPos.inBounds() && !board.pieceAt(currentPos)) {
        moves.push(currentPos)
        currentPos = currentPos.to(direction)
      }
      const currentPiece = currentPos.inBounds() && board.pieceAt(currentPos)
      if (currentPiece) {
        !sameColorAllowed && currentPiece.color !== this.color && moves.push(currentPos)
        sameColorAllowed && moves.push(currentPos)
      }
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
