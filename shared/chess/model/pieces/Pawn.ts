import { Color, PieceName } from "../../types"
import Board from "../Board"
import Pos from "../Pos"
import { Piece } from './Piece'

export class Pawn extends Piece {
  name: PieceName = 'pawn'

  constructor(color: Color, x: number, y: number) {
    super(color, x, y)
  }

  validMoves(board: Board): Pos[] {
    const validMoves: Pos[] = []
    const yDirection = this.color === 'white' ? 1 : -1
    const squaresInFront = {
      1: this.pos.to({ x: 0, y: yDirection }),
      2: this.pos.to({ x: 0, y: 2 * yDirection })
    }
    if (board.pieceAt(squaresInFront[1]) == null) {
      validMoves.push(squaresInFront[1])
      const secondRank = this.color === 'white' ? 1 : Board.size - 2
      if (this.pos.y === secondRank && board.pieceAt(squaresInFront[2]) == null) {
        validMoves.push(squaresInFront[2])
      }
    }

    const captureSquares = [
      this.pos.to({ x: -1, y: yDirection }),
      this.pos.to({ x: 1, y: yDirection })
    ]
    captureSquares.forEach(square => {
      if (square.inBounds() && board.pieceAt(square) && board.pieceAt(square).color !== this.color) {
        validMoves.push(square)
      }
    })

    // en passant
    const fifthRank = this.color === 'white' ? 4 : 3
    const lastMove = board.moves.at(-1)
    if (
      this.pos.y === fifthRank
      && lastMove.pieceName === 'pawn'
      && lastMove.pieceColor !== this.color
      && Math.abs(lastMove.newPos.y - lastMove.oldPos.y) === 2
      && Math.abs(lastMove.newPos.x - this.pos.x) === 1
    ) {
      validMoves.push(new Pos(lastMove.oldPos.x, this.pos.y + yDirection))
    }

    return validMoves
  }
}