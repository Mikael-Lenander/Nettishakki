import { Bishop } from '../../model/pieces'
import Board from '../../model/Board'
import { sortPosArr, showMoves, extractMoves } from '../testHelpers'
import Pos from '../../model/Pos'

let board = Board.empty()

beforeEach(() => {
  board = Board.empty()
})

describe('a bishop', () => {
  test('has correct valid moves on an empty board when in corner', () => {
    const bishop = new Bishop('white', new Pos(0, 0))
    const moves = sortPosArr(bishop.validMoves(board))
    showMoves(bishop.pos, moves)
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
    const bishop = new Bishop('white', new Pos(4, 5))
    const moves = sortPosArr(bishop.validMoves(board))
    showMoves(bishop.pos, moves)
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

})