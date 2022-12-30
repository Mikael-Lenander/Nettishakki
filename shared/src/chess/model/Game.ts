import { Color, GameState, Move } from './types'
import Board from './Board'
import Pos from './Pos'
import { opponent } from './utils'
import { Piece, King } from './pieces'
import { GameOverMessage, GameOverCondition } from '../../types'

export default class Game {
  board: Board
  turn: Color
  mate: boolean
  isCheck: boolean
  constructor(board?: Board) {
    if (board) {
      this.board = board
    } else {
      this.board = new Board()
    }
    this.mate = false
    this.isCheck = false
    this.turn = 'white'
  }

  switchTurns() {
    this.turn = opponent(this.turn)
  }

  over(): GameOverMessage | null {
    if (this.isCheck && this.allMoves(this.turn).length === 0) {
      return { winner: opponent(this.turn), message: GameOverCondition.CheckMate }
    }
    // Patti, nopein mahdollinen teoreettinen patti tulee 19. siirrolla :)
    if (this.board.moves.length >= 19 && !this.isCheck && this.allMoves(this.turn).length === 0) {
      return { winner: null, message: GameOverCondition.StaleMate }
    }
    if (this.board.insufficientMaterial()) {
      return { winner: null, message: GameOverCondition.InsufficientMaterial }
    }
    return null
  }

  static legalMoves(board: Board, isCheck: boolean, turn: Color, piece: Piece): Pos[] {
    if (turn !== piece.color) return []
    if (isCheck) return piece.validMovesInCheck(board)
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
      this.isCheck = this.board.inCheck(this.turn)
      return moves
    }
    return []
  }

  getMoves(piece: Piece): Pos[] {
    return Game.legalMoves(this.board, this.isCheck, this.turn, piece)
  }

  static getMoves(game: GameState, pos: Pos) {
    const { board, isCheck, moves, turn } = game
    const piece = board[pos.y][pos.x]
    if (!piece) return []
    const fullBoard = Board.toFullImplementation(board, moves)
    const fullPiece = Piece.toFullImplementation(piece, pos.x, pos.y)
    return Game.legalMoves(fullBoard, isCheck, turn, fullPiece)
  }

  allMoves(color: Color): Pos[] {
    return this.board.pieces(color).flatMap(piece => this.getMoves(piece))
  }

  pieceIds(): string[] {
    return this.board.board.flatMap(row => row.map(piece => piece?.id).filter(id => id))
  }
}
