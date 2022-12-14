import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'
import { sequelize } from '../utils/db'

export default class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
  declare id: number
  declare draw: boolean
}
Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    draw: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'game',
    updatedAt: false,
    createdAt: 'date'
  }
)
