import { Color } from "shared/chess"

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

export interface InterServerEvents {
}

export interface SocketData {
}