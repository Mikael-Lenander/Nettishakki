"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
class Token extends sequelize_1.Model {
}
exports.default = Token;
Token.init({
    token: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'User', key: 'id' },
        allowNull: false
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    modelName: 'token',
    timestamps: false
});
