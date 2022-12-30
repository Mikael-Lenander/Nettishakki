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
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const up = ({ context: queryInterface }) => __awaiter(void 0, void 0, void 0, function* () {
    yield queryInterface.createTable('users', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        joined_at: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    });
    yield queryInterface.createTable('games', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        draw: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        white_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' }
        },
        black_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' }
        },
        winner_id: {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: 'users', key: 'id' }
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    });
    yield queryInterface.createTable('moves', {
        index: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true
        },
        old_pos: {
            type: sequelize_1.DataTypes.STRING(2),
            primaryKey: true
        },
        new_pos: {
            type: sequelize_1.DataTypes.STRING(2),
            allowNull: false
        },
        game_id: {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: 'games', key: 'id' },
            primaryKey: true
        }
    });
});
exports.up = up;
const down = ({ context: queryInterface }) => __awaiter(void 0, void 0, void 0, function* () {
    yield queryInterface.dropTable('moves');
    yield queryInterface.dropTable('games');
    yield queryInterface.dropTable('users');
});
exports.down = down;
