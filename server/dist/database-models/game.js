"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
const shared_1 = require("shared");
// @ts-ignore
class Game extends sequelize_1.Model {
    winner() {
        return this.winningColor === 'white' ? this.whiteName : this.winningColor === 'black' ? this.blackName : null;
    }
}
exports.default = Game;
Game.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    overMessage: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(shared_1.GameOverCondition),
        allowNull: false
    },
    winningColor: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['black', 'white']
    },
    whiteName: {
        type: sequelize_1.DataTypes.STRING
    },
    blackName: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    modelName: 'game',
    updatedAt: false,
    createdAt: 'date'
});
