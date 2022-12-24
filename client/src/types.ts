import { UserPayload, FinishedGame } from 'shared'

export type Error = {
  error: string
}

export interface TokenPayload extends UserPayload {
  iat: number
  exp: number
}

export interface GameCounts {
  victories: number
  defeats: number
  draws: number
}

export interface PlayerStats {
  games: FinishedGame[]
  gameCounts: GameCounts
}
