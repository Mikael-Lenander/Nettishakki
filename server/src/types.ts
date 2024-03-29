import { Color, Pos } from 'shared'
import Timer from './model/Timer'

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
  isAuthenticated: boolean
  drawOffered: boolean
  timer: Timer
}

export interface MoveCoords {
  oldPos: Pos
  newPos: Pos
}

export type Fields<T> = Record<keyof T, unknown>

export interface SocketData {
  username: string
  userId: number
  isAuthenticated: boolean
}

export interface InterServerEvents {}

export interface GameCounts {
  victories: number
  defeats: number
  draws: number
}
