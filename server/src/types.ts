import { Color, Game } from "shared/chess";

export type ActiveGames = {
  [id: string]: {
    game: Game,
    status: GameStatus,
    players: {
      white: string | null,
      black: string | null
    }
  }
}

export enum GameStatus {
  Starting = 'starting',
  Active = 'active',
}

export interface Player {
  username: string,
  color: Color
}

export interface InterServerEvents {
}

export interface SocketData {
}