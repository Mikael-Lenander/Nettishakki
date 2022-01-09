import { Pos } from '..';
import { Piece } from './pieces';
import { GameOverMessage } from '../../types';
export declare type PieceType = Piece | null;
export declare type SimplePiece = {
    color: Color;
    name: PieceName;
} | null;
export declare type SimpleBoard = SimplePiece[][];
export declare type Color = 'white' | 'black';
export declare type Row = PieceType[];
export declare type BoardType = Array<Row>;
export declare type Direction = {
    x: number;
    y: number;
};
export declare type PosType = Direction;
export declare type Tuple2 = [number, number];
export declare type PieceName = 'bishop' | 'king' | 'knight' | 'pawn' | 'queen' | 'rook';
export interface Move {
    pieceName: PieceName;
    pieceColor: Color;
    oldPos: Pos;
    newPos: Pos;
}
export declare type Turn = {
    oldPos: Pos;
    newPos: Pos;
    turn: Color;
    isCheck: boolean;
};
export interface GameState {
    id: string;
    active: boolean;
    board: SimpleBoard;
    turn: Color;
    isCheck: boolean;
    color: Color;
    moves: Move[];
    opponentName: string;
    overMessage: GameOverMessage | null;
}
export declare type GameStateChange = {
    moves: Move[];
    isCheck: boolean;
    turn: Color;
};
declare type MockPiece = null | 0 | '' | 1 | 'x' | 'P';
export declare type MockBoard = Array<Array<MockPiece>>;
export {};
