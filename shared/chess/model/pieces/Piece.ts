import { Color, Direction, PieceName } from '../../types'
import Pos from '../Pos'
import Board from '../Board'

export abstract class Piece {
  name: PieceName
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

  validMovesInCheck(validMoves: Pos[], checkingPiece: Piece, kingPos: Pos) {
    const captureMove = (pos: Pos) => pos.equals(checkingPiece.pos)
    const squaresBetween = kingPos.squaresBetween(checkingPiece.pos)
    switch (checkingPiece.name) {
      case 'knight':
      case 'pawn':
        return validMoves.filter(pos => captureMove(pos))
      case 'queen':
      case 'rook':
      case 'bishop':
        return validMoves.filter(pos => captureMove(pos) || squaresBetween.includes(pos))
    }
  }
}

export abstract class LongRangePiece extends Piece {
  abstract directions: Direction[]

  constructor(color: Color, x: number, y: number) {
    super(color, x, y)
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