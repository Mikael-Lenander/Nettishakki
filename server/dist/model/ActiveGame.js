"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const Timer_1 = __importDefault(require("./Timer"));
const typeGuards_1 = require("../utils/parsers/typeGuards");
class ActiveGame {
    constructor(id, firstPlayer, isAuthenticated, timeControl) {
        this.id = id;
        this.timeControl = {
            time: timeControl.time * 1000,
            increment: timeControl.increment * 1000
        };
        this.players = [
            {
                username: firstPlayer,
                color: this.randomColor(),
                isAuthenticated,
                drawOffered: false,
                timer: new Timer_1.default(this.timeControl.time, this.timeControl.increment) //eslint-disable-line
            }
        ];
        this.game = new shared_1.Game();
        this.saving = false;
        this.intervalId = null;
    }
    player(identifier) {
        return this.players.find(player => ((0, typeGuards_1.isColor)(identifier) ? player.color === identifier : player.username === identifier));
    }
    get playerOnTurn() {
        return this.player(this.game.turn);
    }
    timeLeft() {
        return {
            white: this.player('white').timer.timeLeft,
            black: this.player('black').timer.timeLeft
        };
    }
    hasPlayer(username) {
        return this.players.map(player => player.username).includes(username);
    }
    playerColor(username) {
        if (username == null)
            return null;
        return this.player(username).color;
    }
    playerWithColor(color) {
        return this.players.find(player => player.color === color);
    }
    opponent(identifier) {
        return this.players.find(player => ((0, typeGuards_1.isColor)(identifier) ? player.color !== identifier : player.username !== identifier));
    }
    addPlayer(username, isAuthenticated) {
        // if (this.players.length === 0) return
        const freeColor = (0, shared_1.opponent)(this.players[0].color);
        const newPlayer = {
            username,
            color: freeColor,
            isAuthenticated,
            drawOffered: false,
            timer: new Timer_1.default(this.timeControl.time, this.timeControl.increment) //eslint-disable-line
        };
        this.players.push(newPlayer);
        return newPlayer;
    }
    isOn() {
        return this.players.length === 2;
    }
    switchTimer(delay) {
        this.player(this.game.turn).timer.start();
        this.opponent(this.game.turn).timer.stop(delay, this.opponent(this.game.turn).color);
    }
    playerWithTimeout() {
        return this.players.find(player => player.timer.timeout());
    }
    offerDraw(username) {
        this.player(username).drawOffered = true;
    }
    declineDraw() {
        this.players.forEach(player => (player.drawOffered = false));
    }
    drawOffered() {
        return this.players.some(player => player.drawOffered);
    }
    notStarted() {
        return this.players.length <= 1;
    }
    randomColor() {
        return shared_1.COLORS[Math.floor(Math.random() * 2)];
    }
}
exports.default = ActiveGame;
