"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOverCondition = void 0;
var GameOverCondition;
(function (GameOverCondition) {
    GameOverCondition["CheckMate"] = "checkmate";
    GameOverCondition["StaleMate"] = "stalemate";
    GameOverCondition["InsufficientMaterial"] = "insufficient material";
    GameOverCondition["ThreefoldRepetition"] = "threefold repetition";
    GameOverCondition["Draw"] = "draw";
    GameOverCondition["Resignation"] = "resignation";
    GameOverCondition["Disconnection"] = "disconnection";
    GameOverCondition["TimeOut"] = "time out";
})(GameOverCondition = exports.GameOverCondition || (exports.GameOverCondition = {}));
