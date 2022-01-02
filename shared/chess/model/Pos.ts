import { Direction } from '../types'
import Board from './Board'

export default class Pos {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  inBounds(): boolean {
    return this.x >= 0 && this.y >= 0 && this.x < Board.size && this.y < Board.size
  }

  to(direction: Direction) {
    return new Pos(this.x + direction.x, this.y + direction.y)
  }
}