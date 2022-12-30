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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const database_models_1 = require("../database-models");
const create = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordHash = yield (0, bcrypt_1.hash)(newUser.password, 10);
    yield database_models_1.User.create({ username: newUser.username, passwordHash });
});
const find = (username) => {
    return database_models_1.User.findOne({ where: { username } });
};
exports.default = { create, find };
