import { Rook } from '../../model/pieces'
import Board from '../../model/Board'
import { sortPosArr, showMoves, extractMoves } from '../testHelpers'

let board = Board.empty()

beforeEach(() => {
  board = Board.empty()
})

describe('a Rook', () => {
  test('has correct valid moves on an empty board when in corner', () => {
    const rook = new Rook('white', 7, 7)
    const moves = sortPosArr(rook.validMoves(board))
    showMoves(moves, rook.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0]
      ])
    )
  })

  test('has correct valid moves on an empty board when in center', () => {
    const rook = new Rook('white', 2, 3)
    const moves = sortPosArr(rook.validMoves(board))
    showMoves(moves, rook.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0]
      ])
    )
  })

  test('has correct valid moves when blocked by friendly pieces', () => {
    const rook = new Rook('white', 2, 3)
    board.add(new Rook('white', 2, 2))
    board.add(new Rook('white', 7, 3))
    const moves = sortPosArr(rook.validMoves(board))
    showMoves(moves, rook.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0]
      ])
    )
  })

  test('has correct valid moves when blocked by opponent pieces', () => {
    const rook = new Rook('black', 6, 6)
    board.add(new Rook('white', 6, 4))
    board.add(new Rook('white', 1, 6))
    board.add(new Rook('black', 7, 6))
    const moves = sortPosArr(rook.validMoves(board))
    showMoves(moves, rook.pos)
    expect(moves).toEqual(
      extractMoves([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0]
      ])
    )
  })
})
