import { Game, Board, Pawn, King, Rook, Pos } from './chess'
import { showMoves } from './chess/tests/testHelpers'

const board = Board.empty()

const king = new King('white', 4, 0)
board.add([
  king,
  new Rook('white', 0, 0),
  new Rook('white', 7, 0),
  new Pawn('black', 0, 6),
  new King('black', 6, 7)
])
const game = new Game(board)
game.makeMove(king.pos, new Pos(5, 0))
game.makeMove(new Pos(0, 6), new Pos(0, 5))
game.makeMove(new Pos(5, 0), new Pos(4, 0))
game.board.display()
const moves = king.legalMoves(board)
showMoves(moves, king.pos)