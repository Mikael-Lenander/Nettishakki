import { Game } from './chess'

const game = new Game()
console.log(game.allMoves('white'))
// game.makeMove(new Pos(4, 1), new Pos(4, 3))
// game.makeMove(new Pos(4, 6), new Pos(4, 4))
// game.makeMove(new Pos(6, 0), new Pos(5, 2))
// game.makeMove(new Pos(1, 7), new Pos(2, 5))
// game.makeMove(new Pos(5, 0), new Pos(2, 3))
// game.makeMove(new Pos(6, 7), new Pos(5, 5))
// game.board.display()
// console.log(game.getMoves(game.board.pieceAt(new Pos(4, 0))))
// console.log(game.getMoves(game.board.pieceAt(new Pos(3, 4))))