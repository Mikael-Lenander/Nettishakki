import { Board, King, Rook } from './chess'
import { showMoves } from './chess/tests/testHelpers'

const board = Board.empty()
const king = new King('black', 6, 1)

board.add([
  new Rook('white', 0, 0),
  new Rook('white', 7, 0),
  king,
  new King('white', 0, 7)
])
showMoves(king.legalMoves(board), king.pos)