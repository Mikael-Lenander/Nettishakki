import { Color, Move, PosType } from '../chess';
import { Info, GameOverMessage } from './game';
export interface ServerToClientEvents {
    getMove: (moves: Move[], isCheck: boolean, turn: Color) => void;
    gameCreated: (info: Info, color?: Color, gameId?: string) => void;
    joinedGame: (info: Info, opponentName?: string, color?: Color, gameId?: string) => void;
    gameOver: (message: GameOverMessage) => void;
}
export interface ClientToServerEvents {
    makeMove: (oldPos: PosType, newPos: PosType) => void;
    createGame: () => void;
    joinGame: (gameId: string) => void;
}
