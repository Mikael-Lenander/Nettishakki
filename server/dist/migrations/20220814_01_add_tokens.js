"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const up = async ({ context: queryInterface }) => {
    await queryInterface.createTable('tokens', {
        token: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: 'users', key: 'id' },
            allowNull: false
        }
    });
};
exports.up = up;
const down = async ({ context: queryInterface }) => {
    await queryInterface.dropTable('tokens');
};
exports.down = down;
