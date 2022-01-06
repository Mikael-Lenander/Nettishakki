import { Color, Move, PosType } from "../chess";

export interface ServerToClientEvents {
  getMove: (moves: Move[], isCheck: boolean, turn: Color) => void
}

export interface ClientToServerEvents {
  makeMove: (oldPos: PosType, newPos: PosType) => void
}