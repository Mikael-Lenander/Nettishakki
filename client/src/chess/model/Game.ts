import { Color, GameState, Move } from "./types"
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

  static legalMoves(board: Board, check: boolean, turn: Color, piece: Piece): Pos[] {
    if (turn !== piece.color) return []
    if (check) return piece.validMovesInCheck(board)
    if (piece instanceof King) return piece.legalMoves(board)
    const pinningPiece = board.pinningPiece(piece)
    if (pinningPiece) return piece.validMovesOnPin(board, pinningPiece)
    return piece.validMoves(board)
  }

  makeMove(oldPos: Pos, newPos: Pos): Move[] {
    const piece = this.board.pieceAt(oldPos)
    if (!piece) return []
    const legalMoves = this.getMoves(piece)
    if (newPos.in(legalMoves)) {
      const moves = this.board.movePiece(oldPos, newPos)
      this.switchTurns()
      this.check = this.board.inCheck(this.turn)
      return moves
    }
    return []
  }

  getMoves(piece: Piece): Pos[] {
    return Game.legalMoves(this.board, this.check, this.turn, piece)
  }

  static getMoves(game: GameState, pos: Pos) {
    const { board, isCheck, moves, turn } = game
    const piece = board[pos.y][pos.x]
    if (!piece) return []
    const fullBoard = Board.toFullImplementation(board, moves)
    const fullPiece = Piece.toFullImplementation(piece, pos.x, pos.y)
    return Game.legalMoves(fullBoard, isCheck, turn, fullPiece)
  }
}