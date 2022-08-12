import { King, Pawn, Rook, Bishop } from '../../model/pieces'
import Board from '../../model/Board'
import { sortPosArr, showMoves, extractMoves } from '../testHelpers'
import Game from '../../model/Game'
import { Pos } from '../..'

let board = Board.empty()

beforeEach(() => {
  board = Board.empty()
})

describe('a King', () => {
  test('has correct valid moves on an empty board when in corner', () => {
    const king = new King('white', 7, 0)
    const moves = sortPosArr(king.validMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ])
    )
  })

  test('has correct valid moves on an empty board when in center', () => {
    const king = new King('white', 4, 5)
    const moves = sortPosArr(king.validMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ])
    )
  })

  test('has correct valid moves when blocked by friendly pieces', () => {
    const king = new King('white', 1, 7)
    board.add(new Pawn('white', 0, 7))
    board.add(new Pawn('white', 2, 6))
    const moves = sortPosArr(king.validMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0]
      ])
    )
  })

  test('has correct valid moves when blocked by opponent pieces', () => {
    const king = new King('black', 6, 5)
    board.add([new Pawn('white', 5, 6), new Pawn('white', 7, 6), new Pawn('black', 6, 4)])
    const moves = sortPosArr(king.validMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ])
    )
  })
  test('can castle with black', () => {
    const king = new King('black', 4, 7)
    board.add([new Rook('black', 0, 7), new Rook('black', 7, 7)])
    const moves = sortPosArr(king.validMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 1, 1, 0]
      ])
    )
  })
  test('can castle with white', () => {
    const king = new King('white', 4, 0)
    board.add([new Rook('white', 0, 0), new Rook('white', 7, 0)])
    const moves = sortPosArr(king.legalMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ])
    )
  })
  test("can't castle when blocked by friendly pieces", () => {
    const king = new King('white', 4, 0)
    board.add([new Rook('white', 0, 0), new Rook('white', 7, 0), new Bishop('white', 3, 0), new Bishop('white', 5, 0)])
    const moves = sortPosArr(king.legalMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ])
    )
  })
  test("can't castle when blocked by opponent pieces", () => {
    const king = new King('black', 4, 7)
    board.add([new Rook('black', 0, 7), new Rook('black', 7, 7), new Bishop('white', 7, 3), new Rook('white', 5, 0)])
    const moves = sortPosArr(king.legalMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ])
    )
  })
  test("can't castle after king or rook has moved", () => {
    const king = new King('white', 4, 0)
    board.add([king, new Rook('white', 0, 0), new Rook('white', 7, 0), new Pawn('black', 0, 6), new King('black', 6, 7)])
    const game = new Game(board)
    game.makeMove(king.pos, new Pos(5, 0))
    game.makeMove(new Pos(0, 6), new Pos(0, 5))
    game.makeMove(new Pos(5, 0), new Pos(4, 0))
    const moves = sortPosArr(king.legalMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ])
    )
  })
  test('castles short correctly', () => {
    const king = new King('white', 4, 0)
    board.add([new Rook('white', 0, 0), new Rook('white', 7, 0), new King('black', 2, 7), king])
    const game = new Game(board)
    game.makeMove(king.pos, new Pos(6, 0))
    game.board.display()
    expect(game.board.pieceAt(new Pos(4, 0))).toBeNull()
    expect(game.board.pieceAt(new Pos(5, 0))).toEqual(new Rook('white', 5, 0))
    expect(game.board.pieceAt(new Pos(6, 0))).toEqual(new King('white', 6, 0))
    expect(game.board.pieceAt(new Pos(7, 0))).toBeNull()
  })
  test('castles long correctly', () => {
    //  [0, 0, 0, 0, 0, 0, 0, 0],
    //  [0, 0, 0, 0, 0, 0, 0, 0],
    //  [0, 0, 0, 0, 0, 0, 0, 0],
    //  [0, 0, 0, 0, 0, 0, 0, 0],
    //  [0, 0, 0, 0, 0, 0, 0, 0],
    //  [0, 0, 0, 0, 0, 0, 0, 0],
    //  [0, 0, 0, 0, 0, 0, 0, 0],
    //  [r, 0, 0, 0, k, 0, 0, 0],
    const king = new King('black', 4, 7)
    board.add([new Rook('black', 0, 7), new Rook('black', 7, 7), new King('white', 2, 0), king])
    const game = new Game(board)
    game.turn = 'black'
    game.makeMove(king.pos, new Pos(2, 7))
    game.board.display()
    expect(game.board.pieceAt(new Pos(0, 7))).toBeNull()
    expect(game.board.pieceAt(new Pos(1, 7))).toBeNull()
    expect(game.board.pieceAt(new Pos(2, 7))).toEqual(new King('black', 2, 7))
    expect(game.board.pieceAt(new Pos(3, 7))).toEqual(new Rook('black', 3, 7))
    expect(game.board.pieceAt(new Pos(4, 7))).toBeNull()
  })
})
