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
Object.defineProperty(exports, "__esModule", { value: true });
const database_models_1 = require("../database-models");
const config_1 = require("../utils/config");
const jwt = __importStar(require("jsonwebtoken"));
const addToken = async (token, userId) => {
    // @ts-ignore
    return database_models_1.Token.create({ token, userId });
};
const removeToken = async (token) => {
    // @ts-ignore
    return database_models_1.Token.destroy({ where: { token } });
};
const removeUserTokens = async (userId) => {
    // @ts-ignore
    return database_models_1.Token.destroy({ where: { userId } });
};
const isValidToken = async (token) => {
    return Boolean(await database_models_1.Token.findOne({ where: { token } }));
};
const generateTokens = async (user) => {
    const accessToken = jwt.sign(user, config_1.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = jwt.sign(user, config_1.REFRESH_TOKEN_SECRET);
    await addToken(refreshToken, user.id);
    return { accessToken, refreshToken };
};
exports.default = { removeToken, isValidToken, removeUserTokens, generateTokens };
