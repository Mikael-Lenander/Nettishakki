"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const up = async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('games', 'winner_id');
    await queryInterface.addColumn('games', 'winning_color', {
        type: sequelize_1.DataTypes.ENUM,
        values: ['black', 'white']
    });
    await queryInterface.addColumn('games', 'white_name', {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    });
    await queryInterface.addColumn('games', 'black_name', {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    });
    await queryInterface.removeColumn('games', 'white_id');
    await queryInterface.addColumn('games', 'white_id', {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' }
    });
    await queryInterface.removeColumn('games', 'black_id');
    await queryInterface.addColumn('games', 'black_id', {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' }
    });
};
exports.up = up;
const down = async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('games', 'winning_color');
    await queryInterface.sequelize.query('drop type enum_games_winning_color;');
    await queryInterface.addColumn('games', 'winner_id', {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' }
    });
    await queryInterface.removeColumn('games', 'white_name');
    await queryInterface.removeColumn('games', 'black_name');
    await queryInterface.changeColumn('games', 'white_id', {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    });
    await queryInterface.changeColumn('games', 'black_id', {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    });
};
exports.down = down;
