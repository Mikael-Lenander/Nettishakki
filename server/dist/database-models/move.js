"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
class Move extends sequelize_1.Model {
}
exports.default = Move;
Move.init({
    index: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    oldPos: {
        type: sequelize_1.DataTypes.STRING(2),
        allowNull: false
    },
    newPos: {
        type: sequelize_1.DataTypes.STRING(2),
        allowNull: false
    },
    gameId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'game', key: 'id' },
        primaryKey: true
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    modelName: 'move',
    timestamps: false
});
