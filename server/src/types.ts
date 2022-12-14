import { Color, Pos } from 'shared'

export type Disconnections = {
  [id: string]: NodeJS.Timeout
}

export enum GameStatus {
  Starting = 'starting',
  Active = 'active'
}

export interface Player {
  username: string
  color: Color
}

export interface MoveCoords {
  oldPos: Pos
  newPos: Pos
}

export type Fields<T> = Record<keyof T, unknown>

// export interface InterServerEvents {
// }

// export interface SocketData {
// }
