import { Color, Direction, PieceName } from '../types';
import { LongRangePiece } from './Piece';
export declare class Bishop extends LongRangePiece {
    name: PieceName;
    directions: Direction[];
    constructor(color: Color, x: number, y: number);
}
