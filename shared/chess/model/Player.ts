import { Color } from "../types";

export default class Player {
  color: Color
  inCheck: boolean
  turn: boolean
  constructor(color: Color) {
    this.color = color
    this.inCheck = false
    this.turn = this.color === 'white' ? true : false
  }

  check() {
    this.inCheck = true
  }
}