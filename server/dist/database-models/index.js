"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.Game = exports.User = exports.Move = void 0;
const game_1 = __importDefault(require("./game"));
exports.Game = game_1.default;
const move_1 = __importDefault(require("./move"));
exports.Move = move_1.default;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const token_1 = __importDefault(require("./token"));
exports.Token = token_1.default;
// @ts-ignore
user_1.default.hasMany(game_1.default, {
    foreignKey: { name: 'whiteId' },
    as: 'white'
});
user_1.default.hasMany(game_1.default, {
    foreignKey: { name: 'blackId' },
    as: 'black'
});
// @ts-ignore
game_1.default.hasMany(move_1.default, { foreignKey: { allowNull: false } });
move_1.default.belongsTo(game_1.default);
// @ts-ignore
user_1.default.hasOne(token_1.default);
token_1.default.belongsTo(user_1.default);
