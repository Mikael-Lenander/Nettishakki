import { BoardType, PieceType, Move, Color } from "../types"
import { Bishop, King, Knight, Pawn, Queen, Rook, Piece } from "./pieces"
import Pos from "./Pos"

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

  movePiece(oldPos: Pos, newPos: Pos): void {
    const piece = this.pieceAt(oldPos)
    piece.pos = newPos
    this.board[newPos.y][newPos.x] = piece
    this.board[oldPos.y][oldPos.x] = null
    this.moves.push({
      pieceName: piece.name,
      pieceColor: piece.color,
      oldPos,
      newPos
    })
  }

  movedPiece(oldPos: Pos, newPos: Pos): Board {
    const newBoard = new Board(this.board)
    newBoard.movePiece(oldPos, newPos)
    return newBoard
  }

  kingPositon(color: Color): Pos {
    return this.board
      .flat()
      .find(piece => piece && piece.name === 'king' && piece.color === color)
      .pos
  }

  pieces(color: Color): Piece[] {
    return this.board
      .flat()
      .filter(piece => piece && piece.color === color)
  }

  longRangePieces(color: Color): Piece[] {
    return this.board
      .flat()
      .filter(piece => piece && piece.color === color && ['rook', 'queen', 'bishop'].includes(piece.name))
  }

  inCheck(color: Color, pieces: Piece[]): boolean {
    return pieces
      .some(piece => piece.validMoves(this).includes(this.kingPositon(color)))
  }

  legalMoves(piece: Piece, opponentPieces: Piece[]) {
    return piece.validMoves(this).filter(move => {
      const newBoard = this.movedPiece(piece.pos, move)
      return !newBoard.inCheck(piece.color, opponentPieces)
    })
  }

  controlledSquares(color: Color): Pos[] {
    return [
      ...new Set(
        this.board
          .flat()
          .filter(piece => piece && piece.color === color)
          .flatMap(piece => {
            console.log('valid moves');
            return piece.validMoves(this)
          })
      )
    ]
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
      ).reverse()
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