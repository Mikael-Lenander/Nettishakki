import { BoardType, PieceType, Move, Color, SimpleBoard } from "./types"
import { Bishop, King, Knight, Pawn, Queen, Rook, Piece } from "./pieces"
import Pos from "./Pos"
import { opponent } from "./utils"
import { uniqWith } from 'lodash'

export default class Board {
  static size = 8
  board: BoardType
  moves: Move[]

  constructor(board?: BoardType) {
    if (board) {
      this.board = board
    } else {
      this.board = Board.createBoard()
    }
    this.moves = []
  }

  pieceAt(pos: Pos): PieceType {
    return this.board[pos.y][pos.x]
  }

  isEmptySquare(pos: Pos): boolean {
    return this.pieceAt(pos) == null
  }

  setPiece(piece: Piece, oldPos: Pos, newPos: Pos) {
    this.board[newPos.y][newPos.x] = piece
    this.board[oldPos.y][oldPos.x] = null
    piece.pos = newPos
    this.moves.push({
      pieceName: piece.name,
      pieceColor: piece.color,
      oldPos,
      newPos
    })
  }

  castle(king: King, oldPos: Pos, newPos: Pos): void {
    this.setPiece(king, oldPos, newPos)
    const rook = this.pieceAt(new Pos(
      newPos.x === 6 ? 7 : 0, 
      king.pos.y
    )) as Rook
    this.setPiece(rook, rook.pos, new Pos(
      rook.pos.x === 7 ? 5 : 3,
      rook.pos.y
    ))
  }

  movePiece(oldPos: Pos, newPos: Pos): void {
    const piece = this.pieceAt(oldPos)
    if (piece instanceof King && piece.isCastleMove(newPos)) {
      this.castle(piece, oldPos, newPos)
      return
    }
    piece && this.setPiece(piece, oldPos, newPos)
  }

  kingPosition(color: Color): Pos {
    return this.board
      .flat()
      .find(piece => piece?.name === 'king' && piece.color === color)
      .pos
  }

  pieces(color: Color): Piece[] {
    return this.board
      .flat()
      .filter(piece => piece && piece.color === color)
  }

  longRangePieces(color: Color): Piece[] {
    return this.pieces(color)
      .filter(piece => ['rook', 'queen', 'bishop'].includes(piece.name))
  }

  kingAttackingPieces(color: Color): Piece[] {
    return this.pieces(color)
      .filter(piece => this.kingPosition(opponent(color)).in(piece.validMoves(this)))
  }

  pinningPiece(pinnedPiece: Piece): Piece | null {
    const kingPos = this.kingPosition(pinnedPiece.color)
    const squaresBetween = kingPos.squaresBetween(pinnedPiece.pos)
    if (squaresBetween.length === 0 && kingPos.distance(pinnedPiece.pos) >= 2) return null
    if (squaresBetween.some(pos => this.pieceAt(pos))) return null
    return this.longRangePieces(opponent(pinnedPiece.color)).find(piece => {
      return piece.pos.squaresBetween(kingPos).length > 0
        && piece.pos.squaresBetween(pinnedPiece.pos).every(pos => !this.pieceAt(pos))
    }) || null
  }

  inCheck(color: Color): boolean {
    const kingPos = this.kingPosition(color)
    return this.pieces(opponent(color))
      .some(piece => kingPos.in(piece.validMoves(this)))
  }

  controlledSquares(color: Color): Pos[] {
    return uniqWith(
      this.pieces(color)
        .flatMap(piece => piece.controlledSquares(this))
      , (a, b) => a.equals(b)
    )
  }

  static simple(): SimpleBoard {
    return Board.createBoard().map(row => (
      row.map(piece => (
        piece ? {
          name: piece.name,
          color: piece.color
        }
        : null
      ))
    ))
  }

  static toFullImplementation(board: SimpleBoard) {
    const fullBoard = board.map((row, y) => (
      row.map((piece, x) => (
        piece ? Piece.toFullImplementation(piece, x, y) : null
      ))
    ))
    return new Board(fullBoard)
  }

  // Vain testaukseen
  add(pieces: Piece | Piece[]) {
    if (pieces instanceof Array) {
      pieces.forEach(piece => {
        this.board[piece.pos.y][piece.pos.x] = piece
      })
    } else {
      this.board[pieces.pos.y][pieces.pos.x] = pieces
    }
  }

  // Vain testaukseen
  display() {
    console.table(
      this.board.map(row =>
        row.map(piece =>
          piece ? `${piece.name.substring(0, 2)}(${piece.color.substring(0, 1)} (${piece.pos.x}, ${piece.pos.y}))` : 0 //eslint-disable-line
        )
      )
    )
  }

  // Vain testaukseen
  static empty(): Board {
    const newBoard = new Board()
    newBoard.board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
    ] as BoardType
    return newBoard
  }

  // Palauttaa laudan avausasemassa
  static createBoard(): BoardType {
    return [
      [
        new Rook('white', 0, 0),
        new Bishop('white', 1, 0),
        new Knight('white', 2, 0),
        new Queen('white', 3, 0),
        new King('white', 4, 0),
        new Knight('white', 5, 0),
        new Bishop('white', 6, 0),
        new Rook('white', 7, 0),
      ],
      [
        new Pawn('white', 0, 1),
        new Pawn('white', 1, 1),
        new Pawn('white', 2, 1),
        new Pawn('white', 3, 1),
        new Pawn('white', 4, 1),
        new Pawn('white', 5, 1),
        new Pawn('white', 6, 1),
        new Pawn('white', 7, 1),
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        new Pawn('black', 0, 6),
        new Pawn('black', 1, 6),
        new Pawn('black', 2, 6),
        new Pawn('black', 3, 6),
        new Pawn('black', 4, 6),
        new Pawn('black', 5, 6),
        new Pawn('black', 6, 6),
        new Pawn('black', 7, 6),
      ],
      [
        new Rook('black', 0, 7),
        new Bishop('black', 1, 7),
        new Knight('black', 2, 7),
        new Queen('black', 3, 7),
        new King('black', 4, 7),
        new Knight('black', 5, 7),
        new Bishop('black', 6, 7),
        new Rook('black', 7, 7),
      ]
    ]
  }
}