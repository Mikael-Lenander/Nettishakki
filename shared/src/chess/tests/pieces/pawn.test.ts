import { Pawn } from '../../model/pieces'
import Board from '../../model/Board'
import { sortPosArr, showMoves, extractMoves } from '../testHelpers'
import { Pos } from '../..'

let board = Board.empty()

beforeEach(() => {
  board = Board.empty()
})


describe('Pawn', () => {
  describe('a white pawn', () => {
    test('has correct valid moves in the opening', () => {
      board = new Board()
      const whitePawn = board.pieceAt(new Pos(0, 1)) as Pawn
      const whiteMoves = sortPosArr(whitePawn.validMoves(board))
      showMoves(whiteMoves, whitePawn.pos)
      expect(whiteMoves).toEqual(extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]))
    })
    test('has correct capturing moves', () => {
      const whitePawn = new Pawn('white', 2, 2)
      board.add([
        whitePawn,
        new Pawn('white', 1, 3),
        new Pawn('black', 3, 3),
        new Pawn('white', 6, 4)
      ])
      const whiteMoves = sortPosArr(whitePawn.validMoves(board))
      showMoves(whiteMoves, whitePawn.pos)
      expect(whiteMoves).toEqual(extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]))
    })
    test("can't move when blocked by a piece", () => {
      const whitePawn = new Pawn('white', 2, 2)
      board.add([
        whitePawn,
        new Pawn('white', 2, 3),
        new Pawn('black', 3, 3),
        new Pawn('white', 7, 4)
      ])
      const whiteMoves = sortPosArr(whitePawn.validMoves(board))
      showMoves(whiteMoves, whitePawn.pos)
      expect(whiteMoves).toEqual(extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]))
    })
    test('can capture on en passant', () => {
      const whitePawn = new Pawn('white', 7, 4)
      board.add([
        whitePawn,
        new Pawn('black', 6, 6),
      ])
      board.movePiece(new Pos(6, 6), new Pos(6, 4))
      const whiteMoves = sortPosArr(whitePawn.validMoves(board))
      showMoves(whiteMoves, whitePawn.pos)
      expect(whiteMoves).toEqual(extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]))
    })
  })

  describe('a black pawn', () => {
    test('has correct valid moves in the opening', () => {
      board = new Board()
      const blackPawn = board.pieceAt(new Pos(6, 6)) as Pawn
      board.display()
      const blackMoves = sortPosArr(blackPawn.validMoves(board))
      showMoves(blackMoves, blackPawn.pos)
      expect(blackMoves).toEqual(extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]))
    })
    test('has correct capturing moves', () => {
      const blackPawn = new Pawn('black', 7, 5)
      board.add([
        blackPawn,
        new Pawn('white', 1, 3),
        new Pawn('black', 3, 3),
        new Pawn('white', 6, 4)
      ])
      const blackMoves = sortPosArr(blackPawn.validMoves(board))
      showMoves(blackMoves, blackPawn.pos)
      expect(blackMoves).toEqual(extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]))
    })
    test("can't move when blocked by a piece", () => {
      const blackPawn = new Pawn('black', 7, 5)
      board.add([
        blackPawn,
        new Pawn('white', 2, 3),
        new Pawn('black', 3, 3),
        new Pawn('white', 7, 4)
      ])
      const blackMoves = sortPosArr(blackPawn.validMoves(board))
      showMoves(blackMoves, blackPawn.pos)
      expect(blackMoves).toHaveLength(0)
    })
    test('can capture on en passant', () => {
      const blackPawn = new Pawn('black', 1, 3)
      board.add([
        blackPawn,
        new Pawn('white', 2, 1),
      ])
      board.movePiece(new Pos(2, 1), new Pos(2, 3))
      const blackMoves = sortPosArr(blackPawn.validMoves(board))
      showMoves(blackMoves, blackPawn.pos)
      expect(blackMoves).toEqual(extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]))
    })
  })
})