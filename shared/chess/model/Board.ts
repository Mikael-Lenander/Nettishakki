import { BoardType, Color, PieceType, Row } from "../types"
import { Bishop, King, Knight, Pawn, Queen, Rook, Piece } from "./pieces"
import Pos from "./Pos"

export default class Board {
  static size = 8
  board: BoardType

  constructor() {
    this.board = Board.#createBoard()

  }

  pieceAt(pos: Pos): PieceType {
    return this.board[pos.y][pos.x]
  }

  // Vain testaukseen
  add(piece: Piece) {
    this.board[piece.pos.y][piece.pos.x] = piece
  }

  // Vain testaukseen
  display() {
    console.table(
      this.board.map(row =>
        row.map(piece =>
          piece ? `${piece.constructor.name.substring(0, 2)}(${piece.color.substring(0, 1)} (${piece.pos.x}, ${piece.pos.y}))` : 0
        )
      ).reverse()
    )
  }

  // Vain testaukseen
  static empty(): Board {
    const newBoard = new Board()
    newBoard.board = Array(8).fill(
      Array(Board.size).fill(null)
    ) as BoardType
    return newBoard
  }

  // Palauttaa laudan avausasemassa
  static #createBoard(): BoardType {
    const pieceRow = (color: Color, row: number) => [
      new Rook(color, new Pos(0, row)),
      new Bishop(color, new Pos(1, row)),
      new Knight(color, new Pos(2, row)),
      new Queen(color, new Pos(3, row)),
      new King(color, new Pos(4, row)),
      new Knight(color, new Pos(5, row)),
      new Bishop(color, new Pos(6, row)),
      new Rook(color, new Pos(7, row)),
    ]
    const pawnRow = (color: Color, row: number) => Array(this.size).fill(null)
      .map((_item, index) => new Pawn(color, new Pos(index, row)))

    const emptyRow = Array(this.size).fill(null) as Row
    return [
      pieceRow('white', 0),
      pawnRow('white', 1),
      emptyRow, emptyRow, emptyRow, emptyRow, emptyRow, emptyRow,
      pawnRow('black', 7),
      pieceRow('black', 8)
    ]
  }
}