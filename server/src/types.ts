import { Color, Pos } from "shakki"

export type Disconnections = {
  [id: string]: NodeJS.Timeout
}

export enum GameStatus {
  Starting = 'starting',
  Active = 'active',
}

export interface Player {
  username: string,
  color: Color
}

export interface MoveCoords {
  oldPos: Pos,
  newPos: Pos
}

// export interface InterServerEvents {
// }

// export interface SocketData {
// }