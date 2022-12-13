import { Color, Direction, PieceName } from '../types';
import { Piece } from './Piece';
import Pos from '../Pos';
import Board from '../Board';
export declare class King extends Piece {
    name: PieceName;
    directions: Direction[];
    constructor(color: Color, x: number, y: number);
    isCastleMove(move: Pos): boolean;
    validMoves(board: Board): Pos[];
    legalMoves(board: Board): Pos[];
    validMovesInCheck(board: Board): Pos[];
    controlledSquares(board: Board): Pos[];
}
