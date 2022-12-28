import { Color } from 'shared'

export default class Timer {
  declare timeLeft: number
  declare increment: number
  declare startTime: number | null
  declare stopTime: number | null
  constructor(time: number, increment: number) {
    this.timeLeft = time
    this.increment = increment
    this.startTime = null
    this.stopTime = null
  }
  start() {
    this.startTime = Date.now()
  }
  stop(delay = 0, color: Color) {
    if (this.startTime == null) return
    this.stopTime = Date.now()
    this.timeLeft -= this.stopTime - this.startTime
    this.timeLeft += this.increment + delay
    console.log(`Added first delay ${delay} to ${color} time`)
  }
  tick() {
    if (this.startTime == null) return
    this.timeLeft -= Date.now() - this.startTime
    this.startTime = Date.now()
  }
  timeout() {
    return this.timeLeft <= 0
  }
  addTime(time: number, color: Color) {
    if (this.startTime == null) return
    this.timeLeft += time
    console.log(`Added second delay ${time} to ${color} time`)
  }
}
