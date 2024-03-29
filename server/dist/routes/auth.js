"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService_1 = __importDefault(require("../services/userService"));
const authService_1 = __importDefault(require("../services/authService"));
const toUser_1 = require("../utils/parsers/toUser");
const bcrypt_1 = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const parsers_1 = require("../utils/parsers/parsers");
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    try {
        const credentials = (0, toUser_1.toUserCredentials)(req.body);
        const user = await userService_1.default.findByName(credentials.username);
        if (!user)
            return res.status(400).json({ error: 'Invalid username' });
        const passwordCorrect = await (0, bcrypt_1.compare)(credentials.password, user.passwordHash);
        if (!passwordCorrect)
            return res.status(401).json({ error: 'Wrong password' });
        const userPayload = { username: user.username, id: user.id };
        const tokens = await authService_1.default.generateTokens(userPayload);
        res.json({ ...tokens, ...userPayload });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
router.post('/logout', (req, res) => {
    var _a;
    try {
        const refreshToken = (0, parsers_1.parseString)((_a = req.body) === null || _a === void 0 ? void 0 : _a.refreshToken, 'refreshToken');
        jwt.verify(refreshToken, config_1.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err)
                return res.status(403).json({ error: 'Unauthorized' });
            const userId = user.id;
            await authService_1.default.removeUserTokens(userId);
            res.send('Logout successful');
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/refresh', async (req, res) => {
    var _a;
    try {
        const refreshToken = (0, parsers_1.parseString)((_a = req.body) === null || _a === void 0 ? void 0 : _a.refreshToken, 'refreshToken');
        const tokenValid = await authService_1.default.isValidToken(refreshToken);
        if (!tokenValid) {
            console.log('Token not in database', refreshToken);
            return res.status(403).json({ error: 'Unauthorized' });
        }
        jwt.verify(refreshToken, config_1.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) {
                console.log('Token not valid');
                return res.status(403).json({ error: 'Unauthorized' });
            }
            const userData = user;
            const userPayload = { username: userData.username, id: userData.id };
            await authService_1.default.removeToken(refreshToken);
            const newTokens = await authService_1.default.generateTokens(userPayload);
            res.json({ ...newTokens, ...userPayload });
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
