"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const database_models_1 = require("../database-models");
const sequelize_1 = require("sequelize");
const create = async (newUser) => {
    const passwordHash = await (0, bcrypt_1.hash)(newUser.password, 10);
    await database_models_1.User.create({ username: newUser.username, passwordHash });
};
async function findByName(usernames) {
    if (Array.isArray(usernames)) {
        // @ts-ignore
        const users = await database_models_1.User.findAll({
            where: {
                username: { [sequelize_1.Op.in]: usernames }
            }
        });
        return users;
    }
    else {
        const user = await database_models_1.User.findOne({ where: { username: usernames } });
        return user;
    }
}
async function findById(id) {
    if (Array.isArray(id)) {
        // @ts-ignore
        const users = await database_models_1.User.findAll({
            where: {
                id: { [sequelize_1.Op.in]: id }
            }
        });
        return users;
    }
    else {
        const user = await database_models_1.User.findByPk(id);
        return user;
    }
}
const findByColor = async (color, activeGame) => {
    const username = activeGame.playerWithColor(color).username;
    const user = await findByName(username);
    return user;
};
exports.default = { create, findByName, findById, findByColor };
