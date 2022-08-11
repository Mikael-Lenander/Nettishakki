import { Color, Direction, PieceName } from "../types";
import { Piece } from './Piece';
import Pos from "../Pos";
import Board from '../Board';
export declare class Knight extends Piece {
    name: PieceName;
    directions: Direction[];
    constructor(color: Color, x: number, y: number);
    moves(board: Board, sameColorAllowed: boolean): Pos[];
    validMoves(board: Board): Pos[];
    controlledSquares(board: Board): Pos[];
}
