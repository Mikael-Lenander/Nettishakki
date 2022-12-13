import { Color, Direction, PieceName } from '../types';
import { LongRangePiece } from './Piece';
export declare class Queen extends LongRangePiece {
    name: PieceName;
    directions: Direction[];
    constructor(color: Color, x: number, y: number);
}
