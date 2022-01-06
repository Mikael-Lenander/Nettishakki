import { Color, PieceName } from "../types"
import Board from "../Board"
import Pos from "../Pos"
import { Piece } from './Piece'

export class Pawn extends Piece {
  name: PieceName = 'pawn'

  constructor(color: Color, x: number, y: number) {
    super(color, x, y)
  }

  yDirection(): number {
    return this.color === 'white' ? 1 : -1
  }

  captureSquares(): Pos[] {
    return [
      this.pos.to({ x: -1, y: this.yDirection() }),
      this.pos.to({ x: 1, y: this.yDirection() })
    ].filter(square => square.inBounds())
  }

  controlledSquares(_board: Board): Pos[] {
    return this.captureSquares()
  }

  isEnPassantMove(newPos: Pos, board: Board) {
    return newPos.x !== this.pos.x && newPos.y !== this.pos.y && board.isEmptySquare(newPos)
  }

  validMoves(board: Board): Pos[] {
    const validMoves: Pos[] = []
    const squaresInFront = {
      1: this.pos.to({ x: 0, y: this.yDirection() }),
      2: this.pos.to({ x: 0, y: 2 * this.yDirection() })
    }
    if (board.pieceAt(squaresInFront[1]) == null) {
      validMoves.push(squaresInFront[1])
      const secondRank = this.color === 'white' ? 1 : Board.size - 2
      if (this.pos.y === secondRank && board.pieceAt(squaresInFront[2]) == null) {
        validMoves.push(squaresInFront[2])
      }
    }

    this.captureSquares().forEach(square => {
      const piece = board.pieceAt(square)
      if (piece && piece.color !== this.color) {
        validMoves.push(square)
      }
    })

    // en passant
    const fifthRank = this.color === 'white' ? 4 : 3
    const lastMove = board.moves.at(-1)
    if (
      lastMove
      && this.pos.y === fifthRank
      && lastMove.pieceName === 'pawn'
      && lastMove.pieceColor !== this.color
      && Math.abs(lastMove.newPos.y - lastMove.oldPos.y) === 2
      && Math.abs(lastMove.newPos.x - this.pos.x) === 1
    ) {
      validMoves.push(new Pos(lastMove.oldPos.x, this.pos.y + this.yDirection()))
    }

    return validMoves
  }
}