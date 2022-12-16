import { BoardType, PieceType, Move, Color, SimpleBoard } from './types'
import { Bishop, King, Knight, Pawn, Queen, Rook, Piece } from './pieces'
import Pos from './Pos'
import { opponent } from './utils'
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

  setPiece(piece: Piece, oldPos: Pos, newPos: Pos, saveMove = true): Move {
    this.board[newPos.y][newPos.x] = piece
    this.board[oldPos.y][oldPos.x] = null
    piece.pos = newPos
    const move = {
      pieceName: piece.name,
      pieceColor: piece.color,
      oldPos,
      newPos
    }
    if (saveMove) this.moves.push(move)
    return move
  }

  castle(king: King, oldPos: Pos, newPos: Pos): Move[] {
    const kingMove = this.setPiece(king, oldPos, newPos)
    const rook = this.pieceAt(new Pos(newPos.x === 6 ? 7 : 0, king.pos.y)) as Rook
    const rookMove = this.setPiece(rook, rook.pos, new Pos(rook.pos.x === 7 ? 5 : 3, rook.pos.y), false)
    return [kingMove, rookMove]
  }

  enPassant(piece: Piece, oldPos: Pos, newPos: Pos): Move[] {
    const pawnMove = this.setPiece(piece, oldPos, newPos)
    const captureSquare = new Pos(newPos.x, oldPos.y)
    const capturedPiece = this.pieceAt(captureSquare)
    this.board[captureSquare.y][captureSquare.x] = null
    return [
      pawnMove,
      {
        pieceName: capturedPiece.name,
        pieceColor: capturedPiece.color,
        oldPos: captureSquare,
        newPos: captureSquare
      }
    ]
  }

  movePiece(oldPos: Pos, newPos: Pos): Move[] {
    const piece = this.pieceAt(oldPos)
    if (!piece) return []
    if (piece instanceof King && piece.isCastleMove(newPos)) {
      return this.castle(piece, oldPos, newPos)
    }
    if (piece instanceof Pawn && piece.isEnPassantMove(newPos, this)) {
      return this.enPassant(piece, oldPos, newPos)
    }
    if (piece instanceof Pawn && piece.isPromotionMove(newPos)) {
      return [this.setPiece(new Queen(piece.color, newPos.x, newPos.y), oldPos, newPos)]
    }
    return [this.setPiece(piece, oldPos, newPos)]
  }

  kingPosition(color: Color): Pos {
    return this.board.flat().find((piece) => piece?.name === 'king' && piece.color === color).pos
  }

  pieces(color: Color): Piece[] {
    return this.board.flat().filter((piece) => piece && piece.color === color)
  }

  longRangePieces(color: Color): Piece[] {
    return this.pieces(color).filter((piece) => ['rook', 'queen', 'bishop'].includes(piece.name))
  }

  kingAttackingPieces(color: Color): Piece[] {
    return this.pieces(color).filter((piece) => this.kingPosition(opponent(color)).in(piece.validMoves(this)))
  }

  pinningPiece(pinnedPiece: Piece): Piece | null {
    const kingPos = this.kingPosition(pinnedPiece.color)
    const squaresBetween = kingPos.squaresBetween(pinnedPiece.pos)
    if (!kingPos.inContactWith(pinnedPiece.pos)) return null
    if (squaresBetween.some((pos) => this.pieceAt(pos))) return null
    return (
      this.longRangePieces(opponent(pinnedPiece.color)).find((piece) => {
        const squaresBetweenKing = piece.pos.squaresBetween(kingPos)
        return pinnedPiece.pos.in(squaresBetweenKing) && piece.pos.squaresBetween(pinnedPiece.pos).every((pos) => !this.pieceAt(pos))
      }) || null
    )
  }

  inCheck(color: Color): boolean {
    const kingPos = this.kingPosition(color)
    return this.pieces(opponent(color)).some((piece) => kingPos.in(piece.controlledSquares(this)))
  }

  controlledSquares(color: Color): Pos[] {
    return uniqWith(
      this.pieces(color).flatMap((piece) => piece.controlledSquares(this)),
      (a, b) => a.equals(b)
    )
  }

  insufficientMaterial(): boolean {
    if (this.moves.length < 35) return false
    const whitePieces = this.pieces('white')
    const blackPieces = this.pieces('black')
    const allPieces = whitePieces.concat(blackPieces)
    return (
      allPieces.length <= 2 ||
      (allPieces.length === 3 && allPieces.some((piece) => piece.name === 'bishop' || piece.name === 'knight')) ||
      (allPieces.length === 4 &&
        whitePieces.some((piece) => piece.name === 'bishop') &&
        blackPieces.some((piece) => piece.name === 'bishop') &&
        whitePieces.find((piece) => piece.name === 'bishop').color === blackPieces.find((piece) => piece.name === 'bishop').color)
    )
  }

  static simple(): SimpleBoard {
    return Board.createBoard().map((row) =>
      row.map((piece) =>
        piece
          ? {
              name: piece.name,
              color: piece.color
            }
          : null
      )
    )
  }

  static toFullImplementation(board: SimpleBoard, moves: Move[]) {
    const constructors = {
      pawn: Pawn,
      bishop: Bishop,
      rook: Rook,
      queen: Queen,
      king: King,
      knight: Knight
    }
    const fullBoard = board.map((row, y) => row.map((piece, x) => (piece ? new constructors[piece.name](piece.color, x, y) : null)))
    const newBoard = new Board(fullBoard)
    newBoard.moves = moves.map((move) => ({
      pieceName: move.pieceName,
      pieceColor: move.pieceColor,
      oldPos: Pos.new(move.oldPos),
      newPos: Pos.new(move.newPos)
    }))
    return newBoard
  }

  // Vain testaukseen
  add(pieces: Piece | Piece[]) {
    if (pieces instanceof Array) {
      pieces.forEach((piece) => {
        this.board[piece.pos.y][piece.pos.x] = piece
      })
    } else {
      this.board[pieces.pos.y][pieces.pos.x] = pieces
    }
  }

  // Vain testaukseen
  display() {
    console.table(
      this.board.map((row) =>
        row.map(
          (piece) => (piece ? `${piece.name.substring(0, 2)}(${piece.color.substring(0, 1)} (${piece.pos.x}, ${piece.pos.y}))` : 0) //eslint-disable-line
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
        new Knight('white', 1, 0),
        new Bishop('white', 2, 0),
        new Queen('white', 3, 0),
        new King('white', 4, 0),
        new Bishop('white', 5, 0),
        new Knight('white', 6, 0),
        new Rook('white', 7, 0)
      ],
      [
        new Pawn('white', 0, 1),
        new Pawn('white', 1, 1),
        new Pawn('white', 2, 1),
        new Pawn('white', 3, 1),
        new Pawn('white', 4, 1),
        new Pawn('white', 5, 1),
        new Pawn('white', 6, 1),
        new Pawn('white', 7, 1)
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
        new Pawn('black', 7, 6)
      ],
      [
        new Rook('black', 0, 7),
        new Knight('black', 1, 7),
        new Bishop('black', 2, 7),
        new Queen('black', 3, 7),
        new King('black', 4, 7),
        new Bishop('black', 5, 7),
        new Knight('black', 6, 7),
        new Rook('black', 7, 7)
      ]
    ]
  }
}
