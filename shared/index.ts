import { Board, Game, Pos } from './chess'

const dummy = Board.simple()
console.log('dummy', dummy)
// const real = Board.toFullImplementation(dummy)

console.log('real', Game.getMoves(dummy, false, new Pos(0, 1)))