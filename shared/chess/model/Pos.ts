import { Direction, PosType } from './types'
import Board from './Board'
import { range } from 'lodash'

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

  distance(other: Pos) {
    return Math.hypot(other.x - this.x, other.y - this.y)
  }

  equals(other: Pos): boolean {
    return this.x === other.x && this.y === other.y
  }

  in(positions: Pos[]): boolean {
    return positions.some(pos => pos.equals(this))
  }

  // Palauttaa ruudut kahden ruudun välissä
  squaresBetween(other: Pos): Pos[] {
    if (this.equals(other)) return []
    const min = new Pos(Math.min(this.x, other.x), Math.min(this.y, other.y))
    const max = new Pos(Math.max(this.x, other.x), Math.max(this.y, other.y))
    const slope = (this.y - other.y) / (this.x - other.x)
    if (!isFinite(slope)) {
      return range(min.y + 1, max.y)
        .map(y => new Pos(this.x, y))
    } else if (slope === Math.sign(slope)) {
      const yStart = this.x < other.x ? this.y : other.y
      return range(min.x + 1, max.x)
        .map((x, index) => new Pos(x, yStart + slope * (index + 1)))
    }
    return []
  }

  static obj(pos: Pos) {
    return {
      x: pos.x,
      y: pos.y
    }
  }

  static new(posType: PosType) {
    return new Pos(posType.x, posType.y)
  }
}