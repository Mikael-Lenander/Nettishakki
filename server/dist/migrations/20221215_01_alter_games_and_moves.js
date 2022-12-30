"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const shared_1 = require("shared");
const up = async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('games', 'draw');
    await queryInterface.addColumn('games', 'over_message', {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(shared_1.GameOverCondition),
        allowNull: false
    });
    await queryInterface.dropTable('moves');
    await queryInterface.createTable('moves', {
        index: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true
        },
        old_pos: {
            type: sequelize_1.DataTypes.STRING(2),
            allowNull: false
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
    await queryInterface.removeColumn('games', 'over_message');
    await queryInterface.sequelize.query('drop type enum_games_over_message;');
    await queryInterface.addColumn('games', 'draw', {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    });
};
exports.down = down;
