import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey, CreationOptional } from 'sequelize'
import { sequelize } from '../utils/db'
import { Color, GameOverCondition } from 'shared'

// @ts-ignore
export default class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
  declare id: CreationOptional<number>
  declare overMessage: string
  declare whiteId: ForeignKey<number>
  declare blackId: ForeignKey<number>
  declare winningColor: Color
  declare whiteName: string
  declare blackName: string

  winner() {
    return this.winningColor === 'white' ? this.whiteName : this.winningColor === 'black' ? this.blackName : null
  }
}
Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    overMessage: {
      type: DataTypes.ENUM,
      values: Object.values(GameOverCondition),
      allowNull: false
    },
    winningColor: {
      type: DataTypes.ENUM,
      values: ['black', 'white']
    },
    whiteName: {
      type: DataTypes.STRING
    },
    blackName: {
      type: DataTypes.STRING
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
