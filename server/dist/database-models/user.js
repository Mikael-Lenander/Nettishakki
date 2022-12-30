"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
const userService_1 = __importDefault(require("../services/userService"));
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            len: {
                args: [3, 20],
                msg: 'Username must be 3-20 characters long'
            },
            is: {
                args: /^[A-Za-z0-9_-äö]+$/,
                msg: 'Username must only contain alphanumeric characters'
            },
            async isUnique(username) {
                const user = await userService_1.default.findByName(username);
                if (user)
                    throw new Error('Username taken');
            }
        },
        allowNull: false
    },
    passwordHash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    modelName: 'user',
    createdAt: 'joinedAt',
    updatedAt: false
});
