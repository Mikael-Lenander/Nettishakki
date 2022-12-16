import { Color } from '../chess';
export interface Info {
    success: boolean;
    message: string;
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
