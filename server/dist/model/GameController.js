"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveGame_1 = __importDefault(require("./ActiveGame"));
class GameController {
    constructor() {
        this.games = [];
        this.disconnections = {};
    }
    find(id) {
        return this.games.find(game => game.id === id);
    }
    findOnGoing(id) {
        return this.games.find(game => game.id === id && game.isOn());
    }
    findWithPlayer(username) {
        const game = this.games.find(game => game.hasPlayer(username));
        if (game)
            return game.id;
        return null;
    }
    findOnGoingWithPlayer(username) {
        const game = this.games.find(game => game.hasPlayer(username) && game.isOn());
        if (game)
            return game.id;
        return null;
    }
    removeWithPlayer(username) {
        this.games = this.games.filter(game => !game.hasPlayer(username));
    }
    remove(id) {
        const game = this.find(id);
        if (!game)
            return;
        clearInterval(game.intervalId);
        this.games = this.games.filter(game => game.id !== id);
    }
    uniqueId() {
        const id = [...Array(4)].map(() => Math.floor(Math.random() * 10)).join('');
        if (!this.games.map(game => game.id).includes(id))
            return id;
        return this.uniqueId();
    }
    new(username, isAuthenticated, timeControl) {
        const newGame = new ActiveGame_1.default(this.uniqueId(), username, isAuthenticated, timeControl);
        this.games.push(newGame);
        return newGame;
    }
    disconnect(username, timeoutId) {
        this.disconnections[username] = timeoutId;
    }
    reconnect(username) {
        clearTimeout(this.disconnections[username]);
        delete this.disconnections[username];
    }
}
exports.default = GameController;
