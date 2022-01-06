import { Color, SimpleBoard } from "./types"
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


  static legalMoves(board: Board, check: boolean, piece: Piece): Pos[] {
    if (check) return piece.validMovesInCheck(board)
    if (piece instanceof King) return piece.legalMoves(board)
    const pinningPiece = board.pinningPiece(piece)
    if (pinningPiece) return piece.validMovesOnPin(board, pinningPiece)
    return piece.validMoves(board)
  }

  makeMove(oldPos: Pos, newPos: Pos) {
    const piece = this.board.pieceAt(oldPos)
    if (!piece) return
    const legalMoves = Game.legalMoves(this.board, this.check, piece)
    if (newPos.in(legalMoves)) {
      this.board.movePiece(oldPos, newPos)
      this.switchTurns()
      this.check = this.board.inCheck(opponent(this.turn))
    }
  }

  static getMoves(board: SimpleBoard, check: boolean, pos: Pos) {
    const piece = board[pos.y][pos.x]
    if (!piece) return []
    const fullBoard = Board.toFullImplementation(board)
    const fullPiece = Piece.toFullImplementation(piece, pos.x, pos.y)
    return this.legalMoves(fullBoard, check, fullPiece)
  }
}