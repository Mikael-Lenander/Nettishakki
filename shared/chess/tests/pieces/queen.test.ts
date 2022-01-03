import { Queen } from '../../model/pieces'
import Board from '../../model/Board'
import { sortPosArr, showMoves, extractMoves } from '../testHelpers'

let board = Board.empty()

beforeEach(() => {
  board = Board.empty()
})

describe('a queen', () => {
  test('has correct valid moves on an empty board when in corner', () => {
    const queen = new Queen('white', 0, 0)
    const moves = sortPosArr(queen.validMoves(board))
    showMoves(moves, queen.pos)    
    expect(moves).toEqual(extractMoves([
     [0, 1, 1, 1, 1, 1, 1, 1],
     [1, 1, 0, 0, 0, 0, 0, 0],
     [1, 0, 1, 0, 0, 0, 0, 0],
     [1, 0, 0, 1, 0, 0, 0, 0],
     [1, 0, 0, 0, 1, 0, 0, 0],
     [1, 0, 0, 0, 0, 1, 0, 0],
     [1, 0, 0, 0, 0, 0, 1, 0],
     [1, 0, 0, 0, 0, 0, 0, 1],
     ]))
    })

  test('has correct valid moves on an empty board when in center', () => {
    const queen = new Queen('white', 4, 5)
    const moves = sortPosArr(queen.validMoves(board))
    showMoves(moves, queen.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 1, 0, 0, 0],
     [1, 0, 0, 0, 1, 0, 0, 0],
     [0, 1, 0, 0, 1, 0, 0, 1],
     [0, 0, 1, 0, 1, 0, 1, 0],
     [0, 0, 0, 1, 1, 1, 0, 0],
     [1, 1, 1, 1, 0, 1, 1, 1],
     [0, 0, 0, 1, 1, 1, 0, 0],
     [0, 0, 1, 0, 1, 0, 1, 0],
     ]))
  })

  test('has correct valid moves when blocked by friendly pieces', () => {
    const queen = new Queen('white', 4, 5)
    board.add(new Queen('white', 0, 1))
    board.add(new Queen('white', 3, 6))
    board.add(new Queen('white', 4, 2))
    const moves = sortPosArr(queen.validMoves(board))
    showMoves(moves, queen.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 0, 0, 1],
     [0, 0, 1, 0, 1, 0, 1, 0],
     [0, 0, 0, 1, 1, 1, 0, 0],
     [1, 1, 1, 1, 0, 1, 1, 1],
     [0, 0, 0, 0, 1, 1, 0, 0],
     [0, 0, 0, 0, 1, 0, 1, 0],
     ]))
  })

  test('has correct valid moves when blocked by opponent pieces', () => {
    const queen = new Queen('black', 4, 5)
    board.add(new Queen('white', 0, 1))
    board.add(new Queen('white', 3, 6))
    board.add(new Queen('white', 4, 2))
    const moves = sortPosArr(queen.validMoves(board))
    showMoves(moves, queen.pos)
    expect(moves).toEqual(extractMoves([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 1, 0],
      ]))
  })

})