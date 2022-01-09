import { Color, PieceName } from "../types";
import Board from "../Board";
import Pos from "../Pos";
import { Piece } from './Piece';
export declare class Pawn extends Piece {
    name: PieceName;
    constructor(color: Color, x: number, y: number);
    yDirection(): number;
    captureSquares(): Pos[];
    controlledSquares(_board: Board): Pos[];
    isEnPassantMove(newPos: Pos, board: Board): boolean;
    isPromotionMove(newPos: Pos): boolean;
    validMoves(board: Board): Pos[];
}
