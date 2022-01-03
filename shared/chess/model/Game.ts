import { Color } from "../types"
import Board from "./Board"
import Player from './Player'
// import Pos from './Pos'
// import { opponentColor } from "./utils"

export default class Game {
  board: Board
  white: Player
  black: Player
  turn: Color
  mate: boolean
  check: boolean
  constructor() {
    this.board = new Board()
    this.white = new Player('white')
    this.black = new Player('black')
    this.mate = false
    this.check = false
    this.turn = 'white'
  }

/*   makeMove(oldPos: Pos, newPos: Pos) {
    const piece = this.board.pieceAt(oldPos)
    if (!piece) return
    if (this.check) {

    } else {
      const opponentPieces = this.board.longRangePieces(opponentColor(this.turn))
      const validMoves = this.board.legalMoves(piece, opponentPieces)
      if (validMoves.includes(newPos)) {
        this.board.movePiece(oldPos, newPos)
        this.turn = opponentColor(this.turn)
        if (!this.board.controlledSquares(this.turn).includes(this.board.kingPositon(opponentColor(this.turn)))) {
          this.check = false
        }
      }
    }
  } */
}