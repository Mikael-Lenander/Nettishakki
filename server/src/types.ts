import { Color, Pos } from 'shakki'

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

export interface UserPayload {
  username: string
  id: number
}

export interface MoveCoords {
  oldPos: Pos
  newPos: Pos
}

export interface NewUser {
  username: string
  password: string
  repeatPassword: string
}

export type UserCredentials = Omit<NewUser, 'repeatPassword'>

export type Fields<T> = Record<keyof T, unknown>

export type Tokens = {
  accessToken: string
  refreshToken: string
}

// export interface InterServerEvents {
// }

// export interface SocketData {
// }
