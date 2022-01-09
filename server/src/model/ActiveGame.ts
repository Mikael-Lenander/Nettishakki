import { Color, Game, opponent } from "shakki"
import { Player } from "../types"

export default class ActiveGame {
  id: string
  game: Game
  players: Player[]
  constructor(id: string, firstPlayer: string) {
    this.id = id
    this.players = [{
      username: firstPlayer,
      color: this.randomColor()
    }]
    this.game = new Game()
  }

  hasPlayer(username: string) {
    return this.players.map(player => player.username).includes(username)
  }

  playerColor(username: string): Color {
    return this.players.find(player => player.username === username).color
  }

  opponent(username: string): Player {
    return this.players.find(player => player.username !== username)
  }

  addPlayer(username: string): Player {
    // if (this.players.length === 0) return
    const freeColor = opponent(this.players[0].color)
    const newPlayer = { username, color: freeColor }
    this.players.push(newPlayer)
    return newPlayer
  }

  isActive() {
    return this.players.length === 2
  }

  notActive() {
    return this.players.length <= 1
  }

  randomColor(): Color {
    return ['white', 'black'][Math.floor(Math.random() * 2)] as Color
  }

}

