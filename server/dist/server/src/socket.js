"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
// import { InterServerEvents, SocketData } from './types'
const src_1 = require("../../shared/src");
const GameController_1 = __importDefault(require("./model/GameController"));
const games = new GameController_1.default();
function socketServer(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: ['http://localhost:3000', 'https://nettishakki.netlify.app']
        }
    });
    io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
        const username = socket.handshake.query.username;
        yield socket.join(username);
        let currentGameId = games.findWithPlayer(username);
        console.log(`User ${username} connected width gameId ${currentGameId}`);
        if (currentGameId) {
            console.log(`Joined back to game ${currentGameId} with user ${username} and timeoutId ${games.disconnections[username]}`);
            games.reconnect(username);
            yield socket.join(currentGameId);
        }
        socket.on('createGame', () => __awaiter(this, void 0, void 0, function* () {
            if (!username)
                return console.log('no user');
            if (games.findActiveWithPlayer(username)) {
                console.log(`Error on createGame due to player ${username} already having an active game`);
                io.to(username).emit('gameCreated', {
                    success: false,
                    message: 'You already have an ongoing game'
                });
                return;
            }
            games.removeWithPlayer(username);
            const currentGame = games.new(username);
            currentGameId = currentGame.id;
            console.log('activeGames', games.games.map(game => game.id));
            yield socket.join(currentGameId);
            io.to(username).emit('gameCreated', { success: true, message: '' }, currentGame.playerColor(username), currentGameId);
            console.log(`game ${currentGameId} created for player ${username}`);
        }));
        socket.on('joinGame', (gameId) => __awaiter(this, void 0, void 0, function* () {
            const game = games.find(gameId);
            // if (activeGame && activeGame.hasPlayer(username)) {
            //   io.to(username).emit('joinedGame', { success: true, message: '' }, activeGame.opponent(username).color, player.color, gameId)
            // }
            if (games.findActiveWithPlayer(username)) {
                io.to(username).emit('joinedGame', {
                    success: false,
                    message: 'You already have an ongoing game'
                });
                return;
            }
            if (!game) {
                io.to(username).emit('joinedGame', {
                    success: false,
                    message: 'Game does not exist'
                });
                return;
            }
            if (game.isActive()) {
                io.to(username).emit('joinedGame', {
                    success: false,
                    message: 'Room full'
                });
                return;
            }
            games.removeWithPlayer(username);
            yield socket.join(gameId);
            currentGameId = game.id;
            const player = game.addPlayer(username);
            const opponent = game.opponent(username);
            console.log('activeGames', games.games.map(game => game.id));
            io.to(username).emit('joinedGame', { success: true, message: '' }, opponent.username, player.color, gameId);
            io.to(opponent.username).emit('joinedGame', { success: true, message: '' }, username);
            console.log(`player ${username} joined to game ${gameId}`);
        }));
        socket.on('makeMove', (oldPos, newPos) => {
            var _a;
            const game = (_a = games.find(currentGameId)) === null || _a === void 0 ? void 0 : _a.game;
            if (!game)
                return;
            const moves = game.makeMove(src_1.Pos.new(oldPos), src_1.Pos.new(newPos));
            io.to(currentGameId).emit('getMove', moves, game.isCheck, game.turn);
            const gameOver = game.over();
            if (gameOver) {
                io.to(currentGameId).emit('gameOver', gameOver);
                games.remove(currentGameId);
                currentGameId = '';
                console.log('game over by checkmate');
                console.log('active games', games.games);
                console.log('current game', currentGameId);
            }
        });
        socket.on('disconnect', () => {
            console.log(`User ${username} has disconnected`);
            const game = games.find(currentGameId);
            if (game) {
                const opponent = game.opponent(username);
                const timeoutId = setTimeout(() => {
                    const game = games.find(currentGameId);
                    if (game && game.isActive()) {
                        io.to(currentGameId).emit('gameOver', {
                            winner: opponent.color,
                            message: 'opponent disconnection'
                        });
                        console.log(`Gameover message sent to player ${opponent.username}`);
                    }
                    games.remove(currentGameId);
                    console.log(`Deleted disconnected game ${currentGameId}`);
                    console.log('active games', games.games);
                }, 10 * 1000);
                console.log(`setting timeout for user ${username} with id ${timeoutId}`);
                games.disconnect(username, timeoutId);
            }
        });
    }));
}
exports.default = socketServer;
