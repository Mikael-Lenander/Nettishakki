"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const shared_1 = require("shared");
const middleware_1 = require("./utils/middleware");
const parsers_1 = require("./utils/parsers/parsers");
const GameController_1 = __importDefault(require("./model/GameController"));
const gameService_1 = __importDefault(require("./services/gameService"));
const activeGames = new GameController_1.default();
function socketServer(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: ['http://localhost:3000', 'https://nettishakki.netlify.app']
        }
    });
    io.use((socket, next) => {
        try {
            const token = (0, parsers_1.parseString)(socket.handshake.auth.token, 'authentication token');
            const user = (0, middleware_1.verifyToken)(token);
            socket.data = {
                username: user.username,
                userId: user.id,
                isAuthenticated: true
            };
            console.log('socket.data', socket.data);
            next();
        }
        catch (error) {
            const guestUsername = socket.handshake.query.username;
            socket.data = {
                username: guestUsername,
                isAuthenticated: false
            };
            console.log('socket.data', socket.data);
            next();
        }
    });
    io.on('connection', async (socket) => {
        const username = (0, parsers_1.parseString)(socket.data.username, 'username');
        await socket.join(username);
        let currentGameId = activeGames.findOnGoingWithPlayer(username);
        console.log(`User ${username} connected width gameId ${currentGameId}`);
        if (currentGameId) {
            console.log(`Joined back to game ${currentGameId} with user ${username} and timeoutId ${activeGames.disconnections[username]}`);
            activeGames.reconnect(username);
            io.to(username).emit('getTime', activeGames.find(currentGameId).timeLeft());
            await socket.join(currentGameId);
        }
        socket.on('createGame', async (timeControl) => {
            if (!username)
                return console.log('no user');
            if (activeGames.findOnGoingWithPlayer(username)) {
                console.log(`Error on createGame due to player ${username} already having an active game`);
                io.to(username).emit('gameCreated', {
                    success: false,
                    message: 'You already have an ongoing game'
                });
                return;
            }
            activeGames.removeWithPlayer(username);
            const currentGame = activeGames.new(username, socket.data.isAuthenticated, timeControl);
            currentGameId = currentGame.id;
            console.log('activeGames', activeGames.games.map(game => game.id));
            await socket.join(currentGameId);
            io.to(username).emit('gameCreated', { success: true, message: '' }, currentGame.playerColor(username), currentGameId, currentGame.timeControl);
            console.log(`game ${currentGameId} created for player ${username}`);
        });
        socket.on('joinGame', async (gameId) => {
            const activeGame = activeGames.find(gameId);
            if (activeGames.findOnGoingWithPlayer(username)) {
                io.to(username).emit('joinedGame', {
                    success: false,
                    message: 'You already have an ongoing game'
                });
                return;
            }
            if (!activeGame) {
                io.to(username).emit('joinedGame', {
                    success: false,
                    message: 'Game does not exist'
                });
                return;
            }
            if (activeGame.isOn()) {
                io.to(username).emit('joinedGame', {
                    success: false,
                    message: 'Room full'
                });
                return;
            }
            activeGames.removeWithPlayer(username);
            await socket.join(gameId);
            currentGameId = activeGame.id;
            const player = activeGame.addPlayer(username, socket.data.isAuthenticated);
            const opponent = activeGame.opponent(username);
            console.log('activeGames', activeGames.games.map(game => game.id));
            io.to(username).emit('joinedGame', { success: true, message: '' }, opponent.username, player.color, gameId, activeGame.timeControl); // eslint-disable-line
            io.to(opponent.username).emit('joinedGame', { success: true, message: '' }, username);
            checkTimerOnIntervals(activeGame);
            console.log(`player ${username} joined to game ${gameId}`);
        });
        socket.on('makeMove', async (oldPos, newPos, date) => {
            const activeGame = activeGames.find(currentGameId);
            if (!(activeGame === null || activeGame === void 0 ? void 0 : activeGame.isOn()) || checkTimer(activeGame))
                return;
            const game = activeGame.game;
            const moves = game.makeMove(shared_1.Pos.new(oldPos), shared_1.Pos.new(newPos));
            if (moves.length === 0)
                return;
            const delay = Date.now() - date;
            activeGame.switchTimer(delay);
            console.log(`time left ${JSON.stringify(activeGame.timeLeft())} delay ${delay}`);
            io.to(currentGameId).emit('moveMade', moves, game.isCheck, game.turn, activeGame.timeLeft(), Date.now());
            const gameOver = game.over();
            if (gameOver) {
                io.to(currentGameId).emit('gameOver', gameOver);
                await gameService_1.default.save(activeGame);
                activeGames.remove(currentGameId);
                currentGameId = null;
                console.log(`game over by ${gameOver.message}`);
                console.log('active games', activeGames.games);
            }
        });
        socket.on('addDelayToTimer', (delay) => {
            const activeGame = activeGames.find(currentGameId);
            if (!(activeGame === null || activeGame === void 0 ? void 0 : activeGame.isOn()))
                return;
            activeGame.player(username).timer.addTime(delay, activeGame.playerColor(username));
        });
        socket.on('resign', async () => {
            const activeGame = activeGames.find(currentGameId);
            if (!(activeGame === null || activeGame === void 0 ? void 0 : activeGame.isOn()) || activeGame.game.board.moves.length < 2)
                return;
            const opponent = activeGame.opponent(username);
            io.to(currentGameId).emit('gameOver', {
                winner: opponent.color,
                message: shared_1.GameOverCondition.Resignation
            });
            await gameService_1.default.save(activeGame, opponent.username, shared_1.GameOverCondition.Resignation);
            activeGames.remove(currentGameId);
            currentGameId = null;
            console.log(`game over by ${shared_1.GameOverCondition.Resignation}`);
            console.log('active games', activeGames.games);
        });
        socket.on('offerDraw', () => {
            const activeGame = activeGames.find(currentGameId);
            if (!(activeGame === null || activeGame === void 0 ? void 0 : activeGame.isOn()) || activeGame.drawOffered() || activeGame.game.board.moves.length < 2)
                return;
            const opponent = activeGame.opponent(username);
            activeGame.offerDraw(username);
            io.to(opponent.username).emit('drawOffered');
            console.log(`draw offered by ${username}`);
        });
        socket.on('drawOfferResponse', async (accepted) => {
            const activeGame = activeGames.find(currentGameId);
            if (!(activeGame === null || activeGame === void 0 ? void 0 : activeGame.isOn()))
                return;
            const opponent = activeGame.opponent(username);
            if (accepted && opponent.drawOffered) {
                io.to(currentGameId).emit('gameOver', {
                    winner: null,
                    message: shared_1.GameOverCondition.Draw
                });
                io.to(opponent.username).emit('drawOfferResponded', true);
                await gameService_1.default.save(activeGame, null, shared_1.GameOverCondition.Draw);
                activeGames.remove(currentGameId);
                currentGameId = null;
                console.log(`game over by ${shared_1.GameOverCondition.Draw}`);
                console.log('active games', activeGames.games);
            }
            else if (opponent.drawOffered) {
                io.to(opponent.username).emit('drawOfferResponded', false);
                activeGame.declineDraw();
                console.log('draw offer declined');
            }
        });
        socket.on('disconnect', () => {
            console.log(`User ${username} has disconnected`);
            const game = activeGames.findOnGoing(currentGameId);
            if (game) {
                const opponent = game.opponent(username);
                const timeoutId = setTimeout(async () => {
                    const game = activeGames.find(currentGameId);
                    if (game && game.isOn()) {
                        io.to(currentGameId).emit('gameOver', {
                            winner: opponent.color,
                            message: shared_1.GameOverCondition.Disconnection
                        });
                        console.log(`Gameover message sent to player ${opponent.username}`);
                    }
                    if (game) {
                        await gameService_1.default.save(game, opponent.username, shared_1.GameOverCondition.Disconnection);
                    }
                    activeGames.remove(currentGameId);
                    console.log(`Deleted disconnected game ${currentGameId}`);
                    console.log('active games', activeGames.games);
                }, 10 * 1000);
                console.log(`setting timeout for user ${username} with id ${timeoutId}`);
                activeGames.disconnect(username, timeoutId);
            }
        });
        function checkTimerOnIntervals(activeGame) {
            if (!(activeGame === null || activeGame === void 0 ? void 0 : activeGame.isOn()))
                return;
            activeGame.intervalId = setInterval(() => {
                checkTimer(activeGame);
            }, 1000);
        }
        function checkTimer(activeGame) {
            activeGame.playerOnTurn.timer.tick();
            // console.log(`white time: ${activeGame.player('white').timer.timeLeft}, black time: ${activeGame.player('black').timer.timeLeft}`)
            const playerWithTimeout = activeGame.playerWithTimeout();
            if (playerWithTimeout) {
                const opponent = activeGame.opponent(playerWithTimeout.username);
                io.to(currentGameId).emit('gameOver', {
                    winner: opponent.color,
                    message: shared_1.GameOverCondition.TimeOut
                }, activeGame.timeLeft());
                console.log(`Gameover message sent to player ${opponent.username}`);
                gameService_1.default.save(activeGame, opponent.username, shared_1.GameOverCondition.TimeOut);
                activeGames.remove(currentGameId);
                console.log(`Deleted timed out game ${currentGameId}`);
                console.log('active games', activeGames.games);
                return true;
            }
            return false;
        }
    });
}
exports.default = socketServer;
