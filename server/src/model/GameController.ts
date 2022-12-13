import ActiveGame from './ActiveGame'
import { Disconnections } from '../types'

export default class GameController {
  games: ActiveGame[]
  disconnections: Disconnections
  constructor() {
    this.games = []
    this.disconnections = {}
  }

  find(id: string): ActiveGame | null {
    return this.games.find(game => game.id === id) || null
  }

  findWithPlayer(username: string): string | null {
    const game = this.games.find(game => game.hasPlayer(username))
    if (game) return game.id
    return null
  }

  findActiveWithPlayer(username: string): string | null {
    const game = this.games.find(game => game.hasPlayer(username) && game.isActive())
    if (game) return game.id
    return null
  }

  removeWithPlayer(username: string): void {
    this.games = this.games.filter(game => !game.hasPlayer(username))
  }

  remove(id: string) {
    this.games = this.games.filter(game => game.id !== id)
  }

  uniqueId(): string {
    const id = [...Array(4)].map(() => Math.floor(Math.random() * 10)).join('')
    if (!this.games.map(game => game.id).includes(id)) return id
    return this.uniqueId()
  }

  new(username: string): ActiveGame {
    const newGame = new ActiveGame(this.uniqueId(), username)
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
