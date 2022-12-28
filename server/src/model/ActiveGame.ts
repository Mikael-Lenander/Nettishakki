import { Color, COLORS, Game, opponent, TimeControl, TimeLeft } from 'shared'
import { Player } from '../types'
import Timer from './Timer'
import { isColor } from '../utils/parsers/typeGuards'

export default class ActiveGame {
  id: string
  game: Game
  players: Player[]
  saving: boolean
  timeControl: TimeControl
  intervalId: NodeJS.Timer | null
  constructor(id: string, firstPlayer: string, isAuthenticated: boolean, timeControl: TimeControl) {
    this.id = id
    this.timeControl = {
      time: timeControl.time * 1000,
      increment: timeControl.increment * 1000
    }
    this.players = [
      {
        username: firstPlayer,
        color: this.randomColor(),
        isAuthenticated,
        drawOffered: false,
        timer: new Timer(this.timeControl.time, this.timeControl.increment) //eslint-disable-line
      }
    ]
    this.game = new Game()
    this.saving = false
    this.intervalId = null
  }

  player(identifier: string | Color): Player {
    return this.players.find(player => (isColor(identifier) ? player.color === identifier : player.username === identifier))
  }

  get playerOnTurn(): Player {
    return this.player(this.game.turn)
  }

  timeLeft(): TimeLeft {
    return {
      white: this.player('white').timer.timeLeft,
      black: this.player('black').timer.timeLeft
    }
  }

  hasPlayer(username: string) {
    return this.players.map(player => player.username).includes(username)
  }

  playerColor(username: string | null): Color {
    if (username == null) return null
    return this.player(username).color
  }

  playerWithColor(color: Color): Player {
    return this.players.find(player => player.color === color)
  }

  opponent(identifier: string | Color): Player {
    return this.players.find(player => (isColor(identifier) ? player.color !== identifier : player.username !== identifier))
  }

  addPlayer(username: string, isAuthenticated: boolean): Player {
    // if (this.players.length === 0) return
    const freeColor = opponent(this.players[0].color)
    const newPlayer = {
      username,
      color: freeColor,
      isAuthenticated,
      drawOffered: false,
      timer: new Timer(this.timeControl.time, this.timeControl.increment) //eslint-disable-line
    }
    this.players.push(newPlayer)
    return newPlayer
  }

  isOn() {
    return this.players.length === 2
  }

  switchTimer(delay: number) {
    this.player(this.game.turn).timer.start()
    this.opponent(this.game.turn).timer.stop(delay, this.opponent(this.game.turn).color)
  }

  playerWithTimeout(): Player | null {
    return this.players.find(player => player.timer.timeout())
  }

  offerDraw(username: string) {
    this.player(username).drawOffered = true
  }

  declineDraw() {
    this.players.forEach(player => (player.drawOffered = false))
  }

  drawOffered() {
    return this.players.some(player => player.drawOffered)
  }

  notStarted() {
    return this.players.length <= 1
  }

  randomColor(): Color {
    return COLORS[Math.floor(Math.random() * 2)]
  }
}
