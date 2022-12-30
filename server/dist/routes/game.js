"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gameService_1 = __importDefault(require("../services/gameService"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const user = req.user;
    const games = await gameService_1.default.find(user.id, user.username);
    res.json(games);
});
exports.default = router;
