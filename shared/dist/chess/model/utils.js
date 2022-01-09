"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNever = exports.opponent = void 0;
function opponent(color) {
    return color === 'white' ? 'black' : 'white';
}
exports.opponent = opponent;
function assertNever(value) {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}
exports.assertNever = assertNever;
