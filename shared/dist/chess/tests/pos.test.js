"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pos_1 = require("../model/Pos");
const testHelpers_1 = require("./testHelpers");
describe('The Pos class', () => {
    describe('squaresBetween method', () => {
        test('returns correct Pos instances when positions are on the same diagonal', () => {
            const tests = [
                (0, testHelpers_1.sortPosArr)(new Pos_1.default(2, 3).squaresBetween(new Pos_1.default(5, 6))),
                (0, testHelpers_1.sortPosArr)(new Pos_1.default(0, 6).squaresBetween(new Pos_1.default(4, 2))),
                (0, testHelpers_1.sortPosArr)(new Pos_1.default(4, 5).squaresBetween(new Pos_1.default(5, 6)))
            ];
            expect(tests[0]).toEqual((0, testHelpers_1.extractPos)([[3, 4], [4, 5]]));
            expect(tests[1]).toEqual((0, testHelpers_1.extractPos)([[1, 5], [2, 4], [3, 3]]));
            expect(tests[2]).toHaveLength(0);
        });
        test('returns correct Pos instances when positions are on the same file', () => {
            const tests = [
                (0, testHelpers_1.sortPosArr)(new Pos_1.default(2, 3).squaresBetween(new Pos_1.default(2, 7))),
                (0, testHelpers_1.sortPosArr)(new Pos_1.default(7, 5).squaresBetween(new Pos_1.default(7, 7))),
                (0, testHelpers_1.sortPosArr)(new Pos_1.default(4, 5).squaresBetween(new Pos_1.default(4, 6)))
            ];
            expect(tests[0]).toEqual((0, testHelpers_1.extractPos)([[2, 4], [2, 5], [2, 6]]));
            expect(tests[1]).toEqual((0, testHelpers_1.extractPos)([[7, 6]]));
            expect(tests[2]).toHaveLength(0);
        });
        test('returns correct Pos instances when positions are on the same rank', () => {
            const tests = [
                (0, testHelpers_1.sortPosArr)(new Pos_1.default(0, 0).squaresBetween(new Pos_1.default(7, 0))),
                (0, testHelpers_1.sortPosArr)(new Pos_1.default(4, 6).squaresBetween(new Pos_1.default(4, 6)))
            ];
            expect(tests[0]).toEqual((0, testHelpers_1.extractPos)([[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]]));
            expect(tests[1]).toHaveLength(0);
        });
    });
});
