import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'
import { sequelize } from '../utils/db'

export default class Move extends Model<InferAttributes<Move>, InferCreationAttributes<Move>> {
  declare index: number
  declare oldPosX: number
  declare oldPosY: number
  declare newPosX: number
  declare newPosY: number
}
Move.init({
  index: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  oldPosX: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  oldPosY: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  newPosX: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  newPosY: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'move',
  timestamps: false
})

