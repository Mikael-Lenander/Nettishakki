"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_models_1 = require("../database-models");
const sequelize_1 = require("sequelize");
const userService_1 = __importDefault(require("./userService"));
const saveMoves = async (moves, gameId) => {
    const serializedMoves = moves.map(({ oldPos, newPos }, index) => ({
        oldPos: oldPos.toString(),
        newPos: newPos.toString(),
        index,
        gameId
    }));
    // @ts-ignore
    await database_models_1.Move.bulkCreate(serializedMoves);
};
const getUsernameAndId = async (activeGame, color) => {
    const player = activeGame.playerWithColor(color);
    if (player.isAuthenticated) {
        const user = await userService_1.default.findByName(player.username);
        return { username: user.username, id: user.id };
    }
    return { username: player.username, id: null };
};
const save = async (activeGame, winnerName, gameOverCondition) => {
    if (activeGame.saving)
        return;
    activeGame.saving = true;
    const { username: whiteName, id: whiteId } = await getUsernameAndId(activeGame, 'white');
    const { username: blackName, id: blackId } = await getUsernameAndId(activeGame, 'black');
    console.log('wu', whiteName, 'bu', blackName, 'wi', whiteId, 'bi', blackId);
    if (whiteId == null && blackId == null)
        return;
    const gameOverMessage = activeGame.game.over();
    const winningColor = winnerName === null ? null : activeGame.playerColor(winnerName) || gameOverMessage.winner;
    const overMessage = gameOverCondition || gameOverMessage.message;
    // @ts-ignore
    const newGame = await database_models_1.Game.create({ whiteId, blackId, whiteName, blackName, winningColor, overMessage });
    await saveMoves(activeGame.game.board.moves, newGame.id);
};
/* Finds all games by user id where the user is either white or black
  and includes all moves but excludes the move's id and index and sorts
  the moves by index. Also includes the game's winner specified by the
  winner method in the game model. Includes all game's attributes
  but winningColor. */
const find = async (userId, username) => {
    // @ts-ignore
    const games = await database_models_1.Game.findAll({
        where: {
            [sequelize_1.Op.or]: [{ whiteId: userId }, { blackId: userId }]
        },
        include: [
            {
                model: database_models_1.Move,
                attributes: ['oldPos', 'newPos']
            }
        ],
        order: [
            ['date', 'DESC'],
            [database_models_1.Move, 'index', 'ASC']
        ]
    });
    const finishedGames = games.map(game => ({ ...game.toJSON(), winner: game.winner() }));
    const counts = gameCounts(finishedGames, username);
    return { games: finishedGames, gameCounts: counts };
};
const gameCounts = (games, username) => {
    const stats = { victories: 0, defeats: 0, draws: 0 };
    games.forEach(game => {
        if (game.winner == null)
            stats.draws++;
        else if (game.winner === username)
            stats.victories++;
        else
            stats.defeats++;
    });
    return stats;
};
exports.default = { saveMoves, save, find };
