import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'
import { sequelize } from '../utils/db'

export default class Token extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
  declare token: string
  declare userId: number
}

Token.init(
  {
    token: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' },
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'token',
    timestamps: false
  }
)
