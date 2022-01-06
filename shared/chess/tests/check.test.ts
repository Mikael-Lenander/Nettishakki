import { King, Knight, Queen, Rook, Bishop } from '../model/pieces'
import { extractMoves, showMoves, sortPosArr } from './testHelpers'
import Game from '../model/Game'
import Board from '../model/Board'
import { Pos } from '..'

let game: Game

beforeEach(() => {
  game = new Game(Board.empty())
})

describe('Check', () => {
  describe('when checked by a knight', () => {
    beforeEach(() => {
      game.board.add([
        new Knight('white', 1, 5),
        new King('black', 0, 7),
        new Queen('black', 4, 2),
        new Rook('black', 0, 6)
      ])
      game.check = true
    })
    test('only valid moves for a queen are to capture or block', () => {
      const queen = game.board.pieceAt(new Pos(4, 2))
      expect(sortPosArr(Game.legalMoves(game.board, game.check, queen))).toEqual([new Pos(1, 5)])
    })
    test("a rook has no moves when it can't capture or block", () => {
      const rook = game.board.pieceAt(new Pos(0, 6))
      expect(sortPosArr(Game.legalMoves(game.board, game.check, rook))).toHaveLength(0)
    })
    test('king has correct escape squares', () => {
      const king = game.board.pieceAt(new Pos(0, 7))
      expect(sortPosArr(Game.legalMoves(game.board, game.check, king))).toEqual(extractMoves([
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 1, 0, 0, 0, 0, 0, 0],
       [0, 1, 0, 0, 0, 0, 0, 0],
       ]))
    })
  })
  describe('when checked by a bishop', () => {
    beforeEach(() => {
      game.board.add([
        new King('white', 4, 4),
        new Bishop('black', 7, 7),
        new Queen('white', 5, 7),
        new Rook('white', 0, 6),
        new Bishop('white', 0, 0),
        new Rook('black', 1, 3)
      ])
      game.check = true
    })
    test('only valid moves for a queen are to capture or block', () => {
      const queen = game.board.pieceAt(new Pos(5, 7))
      const moves = sortPosArr(Game.legalMoves(game.board, game.check, queen))
      showMoves(moves, queen.pos)
      expect(moves).toEqual(extractMoves([
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 1, 0, 0],
       [0, 0, 0, 0, 0, 0, 1, 0],
       [0, 0, 0, 0, 0, 0, 0, 1],
       ]))
    })
    test("only valid moves for a rook are to capture or block", () => {
      const rook = game.board.pieceAt(new Pos(0, 6))
      expect(sortPosArr(Game.legalMoves(game.board, game.check, rook))).toEqual([ new Pos(6, 6) ])
    })
    test('king has correct escape squares', () => {
      const king = game.board.pieceAt(new Pos(4, 4))
      const moves = sortPosArr(Game.legalMoves(game.board, game.check, king))
      showMoves(moves, king.pos)
      expect(moves).toEqual(extractMoves([
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 1, 0, 1, 0, 0],
       [0, 0, 0, 1, 1, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0],
       ]))
    })
  })
})