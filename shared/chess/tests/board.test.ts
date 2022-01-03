import Board from '../model/Board'
import { PieceType } from '../types'
import Pos from '../model/Pos'
// import { extractMoves, showMoves } from './testHelpers'

let board = new Board()
let oldPos: Pos
let newPos: Pos
let movedPiece: PieceType

beforeEach(() => {
  board = new Board()
})

describe('The board', () => {
  describe('movePiece method', () => {

    beforeEach(() => {
      oldPos = new Pos(4, 1)
      newPos = new Pos(4, 3)
      movedPiece = board.pieceAt(oldPos)
      board.movePiece(oldPos, newPos)
    })    

    test('the piece changes position', () => {    
      board.display()
      expect(board.pieceAt(newPos)).toEqual(movedPiece)
      expect(board.pieceAt(oldPos)).toBeNull()
    })

    test('a move is added to board.moves array', () => {
      expect(board.moves).toHaveLength(1)
      expect(board.moves[0]).toEqual({
        pieceName: movedPiece.name,
        pieceColor: movedPiece.color,
        oldPos,
        newPos
      })
    })
  })

/*   describe('controlledSquares method', () => {
    test('returns valid squares', () => {
      board.add([
        new Queen('white', 2, 2),
        new Bishop('black', 4, 4), 
        new Bishop('white', 6, 6),
        new Queen('black', 4, 2)
      ])
      const squares = board.controlledSquares('white')
      showMoves(squares)
      expect(squares).toEqual(extractMoves([
       [1, 0, 1, 0, 0, 0, 0, 0],
       [0, 1, 1, 0, 0, 0, 0, 0],
       [1, 1, 0, 1, 0, 0, 0, 0],
       [0, 0, 1, 1, 0, 0, 0, 0],
       [0, 0, 1, 0, 0, 0, 0, 0],
       [0, 0, 1, 0, 0, 1, 0, 1],
       [0, 0, 1, 0, 0, 0, 0, 0],
       [0, 0, 1, 0, 0, 1, 0, 1],
       ]))
    })
  }) */
})