import { Color, Direction, PieceName, SimplePiece } from '../types';
import Pos from '../Pos';
import Board from '../Board';
export declare abstract class Piece {
    abstract name: PieceName;
    color: Color;
    pos: Pos;
    constructor(color: Color, x: number, y: number);
    isOpponentPiece(piece: Piece): boolean;
    abstract validMoves(board: Board): Pos[];
    abstract controlledSquares(board: Board): Pos[];
    validMovesInCheck(board: Board): Pos[];
    validMovesOnPin(board: Board, pinnningPiece: Piece): Pos[];
    static toFullImplementation(piece: SimplePiece, x: number, y: number): Piece;
}
export declare abstract class LongRangePiece extends Piece {
    abstract directions: Direction[];
    constructor(color: Color, x: number, y: number);
    moves(board: Board, sameColorAllowed: boolean): Pos[];
    validMoves(board: Board): Pos[];
    controlledSquares(board: Board): Pos[];
}
