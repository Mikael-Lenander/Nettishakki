"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const up = async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
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
    await queryInterface.createTable('games', {
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
    await queryInterface.createTable('moves', {
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
};
exports.up = up;
const down = async ({ context: queryInterface }) => {
    await queryInterface.dropTable('moves');
    await queryInterface.dropTable('games');
    await queryInterface.dropTable('users');
};
exports.down = down;
