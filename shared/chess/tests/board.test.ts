import Board from '../model/Board'
import { PieceType } from '../types'
import { Queen, Bishop, King, Pawn, Rook, Knight } from '../model/pieces'
import Pos from '../model/Pos'
import { extractMoves, showMoves, sortPosArr } from './testHelpers'

let board = new Board()
let oldPos: Pos
let newPos: Pos
let movedPiece: PieceType

beforeEach(() => {
  board = new Board()
})

describe('The board', () => {
  describe('movePiece method', () => {
    beforeEach(() => {
      oldPos = new Pos(4, 1)
      newPos = new Pos(4, 3)
      movedPiece = board.pieceAt(oldPos)
      board.movePiece(oldPos, newPos)
    })

    test('the piece changes position', () => {
      board.display()
      expect(board.pieceAt(newPos)).toEqual(movedPiece)
      expect(board.pieceAt(oldPos)).toBeNull()
    })

    test('a move is added to board.moves array', () => {
      expect(board.moves).toHaveLength(1)
      expect(board.moves[0]).toEqual({
        pieceName: movedPiece.name,
        pieceColor: movedPiece.color,
        oldPos,
        newPos
      })
    })
  })

  describe('controlledSquares method', () => {
    test('returns valid squares', () => {
      board = Board.empty()
      board.add([
        new Queen('white', 2, 2),
        new Bishop('black', 4, 4),
        new Bishop('white', 6, 6),
        new Queen('black', 4, 2),
        new Pawn('white', 6, 1)
      ])
      const squares = sortPosArr(board.controlledSquares('white'))
      showMoves(squares)
      expect(squares).toEqual(extractMoves([
        [1, 0, 1, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 0, 1],
        [0, 1, 1, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 1],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 1],
      ]))
    })
    test('returns valid squares 2', () => {
      board = Board.empty()
      board.add([
        new Queen('black', 7, 0),
        new Rook('black', 7, 7),
        new King('white', 6, 6),
        new Knight('white', 5, 4),
        new Pawn('white', 6, 3),
        new Pawn('black', 7, 4)
      ])
      const squares = sortPosArr(board.controlledSquares('white'))
      showMoves(squares)
      expect(squares).toEqual(extractMoves([
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 1, 0, 1, 0],
       [0, 0, 0, 1, 0, 0, 0, 1],
       [0, 0, 0, 0, 0, 1, 0, 1],
       [0, 0, 0, 1, 0, 1, 1, 1],
       [0, 0, 0, 0, 1, 1, 1, 1],
       [0, 0, 0, 0, 0, 1, 1, 1],
       ]))
    })
  })

  describe('pinningPiece method', () => {
    beforeEach(() => {
      board = Board.empty()
    })
    test('correctly returns the pinned piece', () => {
      const pinnedPiece = new Pawn('white', 4, 5)
      const pinningPiece = new Bishop('black', 1, 2)
      board.add([
        new King('white', 5, 6),
        pinnedPiece,
        new Queen('black', 0, 1),
        pinningPiece
      ])
      expect(board.pinningPiece(pinnedPiece)).toEqual(pinningPiece)
    })
    test('correctly returns the pinned piece 2', () => {
      const pinnedPiece = new Queen('white', 1, 4)
      const pinningPiece = new Rook('black', 0, 4)
      board.add([
        new King('white', 6, 4),
        pinnedPiece,
        pinningPiece
      ])
      expect(board.pinningPiece(pinnedPiece)).toEqual(pinningPiece)
    })
    test('correctly returns null when no piece is pinned', () => {
      const notPinnedPiece = new Pawn('white', 4, 5)
      const notPinnedPiece2 = new Pawn('white', 4, 6)
        board.add([
          new Queen('black', 4, 0),
          notPinnedPiece,
          notPinnedPiece2,
          new King('white', 4, 7),
        ])
      expect(board.pinningPiece(notPinnedPiece)).toBeNull()
      expect(board.pinningPiece(notPinnedPiece2)).toBeNull()
    })
  })
})