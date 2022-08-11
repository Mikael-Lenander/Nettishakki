import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'
import { sequelize } from '../utils/db'

export default class Move extends Model<InferAttributes<Move>, InferCreationAttributes<Move>> {
  declare index: number
  declare oldPos: string
  declare newPos: string
}

Move.init({
  index: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  oldPos: {
    type: DataTypes.STRING(2),
    primaryKey: true
  },
  newPos: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'move',
  timestamps: false,
})

