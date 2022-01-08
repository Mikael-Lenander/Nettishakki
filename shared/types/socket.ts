import { Color, Move, PosType } from "../chess";

export interface ServerToClientEvents {
  getMove: (moves: Move[], isCheck: boolean, turn: Color) => void,
  gameCreated: (info: Info, color?: Color, gameId?: string) => void,
  joinedGame: (info: Info, opponentName?: string, color?: Color, gameId?: string) => void,
  gameOver: (message: GameOverMessage) => void
}

export interface ClientToServerEvents {
  makeMove: (oldPos: PosType, newPos: PosType) => void,
  createGame: () => void,
  joinGame: (gameId: string) => void
}

export interface Info {
  success: boolean,
  message: string
}

export interface GameOverMessage {
  winner: Color | null,
  message: string
}