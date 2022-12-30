"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shakki_1 = require("shakki");
class ActiveGame {
    constructor(id, firstPlayer) {
        this.id = id;
        this.players = [
            {
                username: firstPlayer,
                color: this.randomColor()
            }
        ];
        this.game = new shakki_1.Game();
    }
    hasPlayer(username) {
        return this.players.map(player => player.username).includes(username);
    }
    playerColor(username) {
        return this.players.find(player => player.username === username).color;
    }
    opponent(username) {
        return this.players.find(player => player.username !== username);
    }
    addPlayer(username) {
        // if (this.players.length === 0) return
        const freeColor = (0, shakki_1.opponent)(this.players[0].color);
        const newPlayer = { username, color: freeColor };
        this.players.push(newPlayer);
        return newPlayer;
    }
    isActive() {
        return this.players.length === 2;
    }
    notActive() {
        return this.players.length <= 1;
    }
    randomColor() {
        return ['white', 'black'][Math.floor(Math.random() * 2)];
    }
}
exports.default = ActiveGame;
