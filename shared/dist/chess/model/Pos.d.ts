import { Direction, PosType, PosString } from './types';
export default class Pos {
    x: number;
    y: number;
    constructor(x: number, y: number);
    inBounds(): boolean;
    inContactWith(other: Pos): boolean;
    to(direction: Direction): Pos;
    directionTo(other: Pos): Direction | null;
    distance(other: Pos): number;
    equals(other: Pos): boolean;
    in(positions: Pos[]): boolean;
    squaresBetween(other: Pos): Pos[];
    toString(): string;
    static obj(pos: Pos): {
        x: number;
        y: number;
    };
    static new(posType: PosType | PosString): Pos;
}
