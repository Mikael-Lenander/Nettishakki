import { Color } from "shared/chess"
import { ActiveGames } from "./types"

export function randomColor(): Color {
  return ['white', 'black'][Math.floor(Math.random() * 2)] as Color
}

export function generateUniqueId(ids: string[]): string {
  const id = [...Array(4)].map(() => Math.floor(Math.random() * 10)).join('')
  if (!ids.includes(id)) return id
  return generateUniqueId(ids)
}

export function findGameId(username: string, activeGames: ActiveGames): string | null {
  return Object.keys(activeGames).find(gameId => {
    const players = Object.values(activeGames[gameId].players)
    return players.includes(username)
  }) || null
}