import { Color } from "../types"
import Board from "./Board"
import Pos from './Pos'
import { opponent } from "./utils"
import { Piece, King } from './pieces'

export default class Game {
  board: Board
  turn: Color
  mate: boolean
  check: boolean
  constructor(board?: Board) {
    if (board) {
      this.board = board
    } else {
      this.board = new Board()
    }
    this.mate = false
    this.check = false
    this.turn = 'white'
  }

  switchTurns() {
    this.turn = opponent(this.turn)
  }

  legalMoves(piece: Piece): Pos[] {
    if (this.check) return piece.validMovesInCheck(this.board)
    if (piece instanceof King) return piece.legalMoves(this.board)
    const pinningPiece = this.board.pinningPiece(piece)
    if (pinningPiece) return piece.validMovesOnPin(this.board, pinningPiece)
    return piece.validMoves(this.board)
  }

  makeMove(oldPos: Pos, newPos: Pos) {
    const piece = this.board.pieceAt(oldPos)
    if (!piece) return
    const legalMoves = this.legalMoves(piece)
    if (newPos.in(legalMoves)) {
      this.board.movePiece(oldPos, newPos)
      this.switchTurns()
      this.check = this.board.inCheck(opponent(this.turn))
    }
  }
}