import { Color, Move, PosType } from "../chess";

export interface ServerToClientEvents {
  getMove: (moves: Move[], isCheck: boolean, turn: Color) => void,
  gameCreated: (color: Color, gameId: string) => void,
  joinedGame: (info: Info, opponentName?: string, color?: Color, gameId?: string) => void,
  gameOver: (data: GameOver) => void
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

export interface GameOver {
  winner: Color | null,
  message: string
}