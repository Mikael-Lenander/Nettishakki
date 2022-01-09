"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = require("./Board");
const lodash_1 = require("lodash");
class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    inBounds() {
        return this.x >= 0 && this.y >= 0 && this.x < Board_1.default.size && this.y < Board_1.default.size;
    }
    inContactWith(other) {
        return this.squaresBetween(other).length > 0 || this.distance(other) < 2;
    }
    to(direction) {
        return new Pos(this.x + direction.x, this.y + direction.y);
    }
    directionTo(other) {
        return {
            x: Math.sign(other.x - this.x),
            y: Math.sign(other.y - this.y)
        };
    }
    distance(other) {
        return Math.hypot(other.x - this.x, other.y - this.y);
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    in(positions) {
        return positions.some(pos => pos.equals(this));
    }
    // Palauttaa ruudut kahden ruudun välissä
    squaresBetween(other) {
        if (this.equals(other))
            return [];
        const min = new Pos(Math.min(this.x, other.x), Math.min(this.y, other.y));
        const max = new Pos(Math.max(this.x, other.x), Math.max(this.y, other.y));
        const slope = (this.y - other.y) / (this.x - other.x);
        if (!isFinite(slope)) {
            return (0, lodash_1.range)(min.y + 1, max.y)
                .map(y => new Pos(this.x, y));
        }
        else if (slope === Math.sign(slope)) {
            const yStart = this.x < other.x ? this.y : other.y;
            return (0, lodash_1.range)(min.x + 1, max.x)
                .map((x, index) => new Pos(x, yStart + slope * (index + 1)));
        }
        return [];
    }
    static obj(pos) {
        return {
            x: pos.x,
            y: pos.y
        };
    }
    static new(posType) {
        return new Pos(posType.x, posType.y);
    }
}
exports.default = Pos;
