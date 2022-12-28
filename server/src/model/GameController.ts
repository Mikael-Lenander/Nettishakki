import ActiveGame from './ActiveGame'
import { Disconnections } from '../types'
import { TimeControl } from 'shared'

export default class GameController {
  games: ActiveGame[]
  disconnections: Disconnections
  constructor() {
    this.games = []
    this.disconnections = {}
  }

  find(id: string): ActiveGame | null {
    return this.games.find(game => game.id === id)
  }

  findOnGoing(id: string): ActiveGame | null {
    return this.games.find(game => game.id === id && game.isOn())
  }

  findWithPlayer(username: string): string | null {
    const game = this.games.find(game => game.hasPlayer(username))
    if (game) return game.id
    return null
  }

  findOnGoingWithPlayer(username: string): string | null {
    const game = this.games.find(game => game.hasPlayer(username) && game.isOn())
    if (game) return game.id
    return null
  }

  removeWithPlayer(username: string): void {
    this.games = this.games.filter(game => !game.hasPlayer(username))
  }

  remove(id: string) {
    const game = this.find(id)
    if (!game) return
    clearInterval(game.intervalId)
    this.games = this.games.filter(game => game.id !== id)
  }

  uniqueId(): string {
    const id = [...Array(4)].map(() => Math.floor(Math.random() * 10)).join('')
    if (!this.games.map(game => game.id).includes(id)) return id
    return this.uniqueId()
  }

  new(username: string, isAuthenticated: boolean, timeControl: TimeControl): ActiveGame {
    const newGame = new ActiveGame(this.uniqueId(), username, isAuthenticated, timeControl)
    this.games.push(newGame)
    return newGame
  }

  disconnect(username: string, timeoutId: NodeJS.Timeout) {
    this.disconnections[username] = timeoutId
  }

  reconnect(username: string) {
    clearTimeout(this.disconnections[username])
    delete this.disconnections[username]
  }
}
