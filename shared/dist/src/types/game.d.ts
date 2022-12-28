import { Color, PosType } from '../chess';
export interface Info {
    success: boolean;
    message: string;
}
export interface MovePos {
    oldPos: PosType;
    newPos: PosType;
}
export interface GameOverMessage {
    winner: Color | null;
    message: GameOverCondition;
}
export declare enum GameOverCondition {
    CheckMate = "checkmate",
    StaleMate = "stalemate",
    InsufficientMaterial = "insufficient material",
    ThreefoldRepetition = "threefold repetition",
    Draw = "draw",
    Resignation = "resignation",
    Disconnection = "disconnection",
    TimeOut = "time out"
}
export declare type FinishedGame = {
    id: number;
    overMessage: GameOverCondition;
    winner: string | null;
    winningColor: Color | null;
    whiteName: string;
    blackName: string;
    whiteId: number | null;
    blackId: number | null;
    moves: MovePos[];
    date: string;
};
export declare type TimeControl = {
    time: number;
    increment: number;
};
export declare type TimeLeft = {
    white: number;
    black: number;
};
