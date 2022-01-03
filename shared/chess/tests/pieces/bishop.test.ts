import { Bishop } from '../../model/pieces'
import Board from '../../model/Board'
import { sortPosArr, showMoves, extractMoves } from '../testHelpers'

let board = Board.empty()

beforeEach(() => {
  board = Board.empty()
})

describe('a bishop', () => {
  test('has correct valid moves on an empty board when in corner', () => {
    const bishop = new Bishop('white', 0, 0)
    const moves = sortPosArr(bishop.validMoves(board))
    showMoves(moves, bishop.pos)    
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 0, 0, 0],
     [0, 0, 1, 0, 0, 0, 0, 0],
     [0, 0, 0, 1, 0, 0, 0, 0],
     [0, 0, 0, 0, 1, 0, 0, 0],
     [0, 0, 0, 0, 0, 1, 0, 0],
     [0, 0, 0, 0, 0, 0, 1, 0],
     [0, 0, 0, 0, 0, 0, 0, 1],
     ]))
    })

  test('has correct valid moves on an empty board when in center', () => {
    const bishop = new Bishop('white', 4, 5)
    const moves = sortPosArr(bishop.validMoves(board))
    showMoves(moves, bishop.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 0, 0, 0, 0],
     [1, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 0, 0, 1],
     [0, 0, 1, 0, 0, 0, 1, 0],
     [0, 0, 0, 1, 0, 1, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 1, 0, 1, 0, 0],
     [0, 0, 1, 0, 0, 0, 1, 0],
     ]))
  })

  test('has correct valid moves when blocked by friendly pieces', () => {
    const bishop = new Bishop('white', 4, 5)
    board.add(new Bishop('white', 0, 1))
    board.add(new Bishop('white', 3, 6))
    const moves = sortPosArr(bishop.validMoves(board))
    showMoves(moves, bishop.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 0, 0, 1],
     [0, 0, 1, 0, 0, 0, 1, 0],
     [0, 0, 0, 1, 0, 1, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 1, 0, 0],
     [0, 0, 0, 0, 0, 0, 1, 0],
     ]))
  })

  test('has correct valid moves when blocked by opponent pieces', () => {
    const bishop = new Bishop('black', 4, 5)
    board.add(new Bishop('white', 0, 1))
    board.add(new Bishop('white', 3, 6))
    const moves = sortPosArr(bishop.validMoves(board))
    showMoves(moves, bishop.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 0, 0, 0, 0],
     [1, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 0, 0, 1],
     [0, 0, 1, 0, 0, 0, 1, 0],
     [0, 0, 0, 1, 0, 1, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 1, 0, 1, 0, 0],
     [0, 0, 0, 0, 0, 0, 1, 0],
     ]))
  })

})