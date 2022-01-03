import { King, Pawn } from '../../model/pieces'
import Board from '../../model/Board'
import { sortPosArr, showMoves, extractMoves } from '../testHelpers'

let board = Board.empty()

beforeEach(() => {
  board = Board.empty()
})

describe('a King', () => {
  test('has correct valid moves on an empty board when in corner', () => {
    const king = new King('white', 7, 0)
    const moves = sortPosArr(king.validMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(extractMoves([
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]))
  })

  test('has correct valid moves on an empty board when in center', () => {
    const king = new King('white', 4, 5)
    const moves = sortPosArr(king.validMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 1, 1, 1, 0, 0],
     [0, 0, 0, 1, 0, 1, 0, 0],
     [0, 0, 0, 1, 1, 1, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     ]))
  })

  test('has correct valid moves when blocked by friendly pieces', () => {
    const king = new King('white', 1, 7)
    board.add(new Pawn('white', 0, 7))
    board.add(new Pawn('white', 2, 6))
    const moves = sortPosArr(king.validMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [1, 1, 0, 0, 0, 0, 0, 0],
     [0, 0, 1, 0, 0, 0, 0, 0],
     ]))
  })

  test('has correct valid moves when blocked by opponent pieces', () => {
    const king = new King('black', 6, 5)
    board.add([
      new Pawn('white', 5, 6),
      new Pawn('white', 7, 6),
      new Pawn('black', 6, 4)
    ])
    const moves = sortPosArr(king.validMoves(board))
    showMoves(moves, king.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 1, 0, 1],
     [0, 0, 0, 0, 0, 1, 0, 1],
     [0, 0, 0, 0, 0, 1, 1, 1],
     [0, 0, 0, 0, 0, 0, 0, 0],
     ]))
  })

})