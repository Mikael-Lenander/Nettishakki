import { Pos, PosType } from "../chess";

export interface ServerToClientEvents {
  getMove: (oldPos: PosType, newPos: PosType) => void

}

export interface ClientToServerEvents {
  makeMove: (oldPos: Pos, newPos: Pos) => void
}