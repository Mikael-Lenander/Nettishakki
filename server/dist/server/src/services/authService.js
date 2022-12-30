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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_models_1 = require("../database-models");
const config_1 = require("../utils/config");
const jwt = __importStar(require("jsonwebtoken"));
const addToken = (token, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return database_models_1.Token.create({ token, userId });
});
const removeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return database_models_1.Token.destroy({ where: { token } });
});
const removeUserTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return database_models_1.Token.destroy({ where: { userId } });
});
const isValidToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return Boolean(yield database_models_1.Token.findOne({ where: { token } }));
});
const generateTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = jwt.sign(user, config_1.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    const refreshToken = jwt.sign(user, config_1.REFRESH_TOKEN_SECRET);
    yield addToken(refreshToken, user.id);
    return { accessToken, refreshToken };
});
exports.default = { removeToken, isValidToken, removeUserTokens, generateTokens };
