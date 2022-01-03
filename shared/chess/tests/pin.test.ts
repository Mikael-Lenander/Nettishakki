import { King, Queen, Rook } from '../model/pieces'
import { extractMoves, showMoves, sortPosArr } from './testHelpers'
import Game from '../model/Game'
import Board from '../model/Board'
import { Pos } from '..'

let game: Game

beforeEach(() => {
  game = new Game(Board.empty())
})

describe('Pins', () => {
  describe('when pinned by a rook', () => {
    beforeEach(() => {
      game.board.add([
        new King('black', 4, 0),
        new Rook('white', 4, 7),
        new Queen('black', 4, 1)
      ])
      game.turn = 'black'
    })
    test("a queen can't discover its own king", () => {
      const queen = game.board.pieceAt(new Pos(4, 1))
      const moves = sortPosArr(game.legalMoves(queen))
      showMoves(moves, queen.pos)
      expect(moves).toEqual(extractMoves([
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 1, 0, 0, 0],
       [0, 0, 0, 0, 1, 0, 0, 0],
       [0, 0, 0, 0, 1, 0, 0, 0],
       [0, 0, 0, 0, 1, 0, 0, 0],
       [0, 0, 0, 0, 1, 0, 0, 0],
       [0, 0, 0, 0, 1, 0, 0, 0],
       ]))
    })
    test("a queen can move after the king has unpinned", () => {
      game.makeMove(new Pos(4, 0), new Pos(5, 0))
      game.board.display()
      const queen = game.board.pieceAt(new Pos(4, 1))
      const moves = sortPosArr(game.legalMoves(queen))
      showMoves(moves, queen.pos)
      expect(moves).toEqual(extractMoves([
       [0, 0, 0, 1, 1, 0, 0, 0],
       [1, 1, 1, 1, 0, 1, 1, 1],
       [0, 0, 0, 1, 1, 1, 0, 0],
       [0, 0, 1, 0, 1, 0, 1, 0],
       [0, 1, 0, 0, 1, 0, 0, 1],
       [1, 0, 0, 0, 1, 0, 0, 0],
       [0, 0, 0, 0, 1, 0, 0, 0],
       [0, 0, 0, 0, 1, 0, 0, 0],
       ]))
    })
  })
  
})