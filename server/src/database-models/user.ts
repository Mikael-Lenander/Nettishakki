import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'
import { sequelize } from '../utils/db'

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: number
  declare username: string
  declare passwordHash: string
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 20],
          msg: 'Username must be 3-20 characters long'
        },
        is: {
          args: /^[A-Za-z0-9_-äö]+$/,
          msg: 'Username must only contain alphanumeric characters'
        },
        async isUnique(username: string) {
          const user = await User.findOne({ where: { username } })
          if (user) throw new Error('Username taken')
        }
      },
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'user',
    createdAt: 'joinedAt',
    updatedAt: false
  }
)
