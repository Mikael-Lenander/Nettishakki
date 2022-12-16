import { Color, Game, opponent } from 'shared'
import { Player } from '../types'

export default class ActiveGame {
  id: string
  game: Game
  players: Player[]
  saved: boolean
  constructor(id: string, firstPlayer: string, isAuthenticated: boolean) {
    this.id = id
    this.players = [
      {
        username: firstPlayer,
        color: this.randomColor(),
        isAuthenticated
      }
    ]
    this.game = new Game()
    this.saved = false
  }

  hasPlayer(username: string) {
    return this.players.map(player => player.username).includes(username)
  }

  playerColor(username: string | null): Color {
    if (username == null) return null
    return this.players.find(player => player.username === username).color
  }

  playerWithColor(color: Color): Player {
    return this.players.find(player => player.color === color)
  }

  opponent(username: string): Player {
    return this.players.find(player => player.username !== username)
  }

  addPlayer(username: string, isAuthenticated: boolean): Player {
    // if (this.players.length === 0) return
    const freeColor = opponent(this.players[0].color)
    const newPlayer = { username, color: freeColor, isAuthenticated }
    this.players.push(newPlayer)
    return newPlayer
  }

  isOn() {
    return this.players.length === 2
  }

  notStarted() {
    return this.players.length <= 1
  }

  randomColor(): Color {
    return ['white', 'black'][Math.floor(Math.random() * 2)] as Color
  }
}
