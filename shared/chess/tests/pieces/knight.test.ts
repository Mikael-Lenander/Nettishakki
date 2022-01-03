import { Knight } from '../../model/pieces'
import Board from '../../model/Board'
import { sortPosArr, showMoves, extractMoves } from '../testHelpers'

let board = Board.empty()

beforeEach(() => {
  board = Board.empty()
})


describe('A knight', () => {
  test('has correct valid moves on an empty board when in corner', () => {
    const knight = new Knight('white', 0, 7)
    const moves = sortPosArr(knight.validMoves(board))
    showMoves(moves, knight.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 0, 0, 0],
     [0, 0, 1, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     ]))
  })
  test('has correct valid moves on an empty board when in center', () => {
    const knight = new Knight('white', 3, 4)
    const moves = sortPosArr(knight.validMoves(board))
    showMoves(moves, knight.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 1, 0, 1, 0, 0, 0],
     [0, 1, 0, 0, 0, 1, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 1, 0, 0],
     [0, 0, 1, 0, 1, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     ]))
  })
  test('has correct valid moves when blocked by friendly pieces', () => {
    const knight = new Knight('white', 2, 1)
    board.add(new Knight('white', 4, 2))
    board.add(new Knight('white', 0, 0))
    const moves = sortPosArr(knight.validMoves(board))
    showMoves(moves, knight.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 1, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [1, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 0, 1, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     ]))
  })
  test('has correct valid moves when blocked by opponent pieces', () => {
    const knight = new Knight('white', 1, 6)
    board.add(new Knight('black', 2, 4))
    board.add(new Knight('black', 3, 7))
    const moves = sortPosArr(knight.validMoves(board))
    showMoves(moves, knight.pos)
    expect(moves).toEqual(extractMoves([
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [1, 0, 1, 0, 0, 0, 0, 0],
     [0, 0, 0, 1, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 1, 0, 0, 0, 0],
     ]))
  })
})