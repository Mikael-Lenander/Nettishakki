import { DataTypes, QueryInterface } from 'sequelize'

export const up = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.createTable('tokens', {
    token: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
      allowNull: false
    }
  })
}

export const down = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.dropTable('tokens')
}
