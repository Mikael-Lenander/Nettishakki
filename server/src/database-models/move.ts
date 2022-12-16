import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize'
import { sequelize } from '../utils/db'

export default class Move extends Model<InferAttributes<Move>, InferCreationAttributes<Move>> {
  declare index: number
  declare oldPos: string
  declare newPos: string
  declare gameId: ForeignKey<number>
}

Move.init(
  {
    index: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    oldPos: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    newPos: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: { model: 'game', key: 'id' },
      primaryKey: true
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'move',
    timestamps: false
  }
)
