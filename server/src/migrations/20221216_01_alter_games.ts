import { DataTypes, QueryInterface } from 'sequelize'

export const up = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.removeColumn('games', 'winner_id')
  await queryInterface.addColumn('games', 'winning_color', {
    type: DataTypes.ENUM,
    values: ['black', 'white']
  })
  await queryInterface.addColumn('games', 'white_name', {
    type: DataTypes.STRING,
    allowNull: false
  })
  await queryInterface.addColumn('games', 'black_name', {
    type: DataTypes.STRING,
    allowNull: false
  })
  await queryInterface.removeColumn('games', 'white_id')
  await queryInterface.addColumn('games', 'white_id', {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' }
  })
  await queryInterface.removeColumn('games', 'black_id')
  await queryInterface.addColumn('games', 'black_id', {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' }
  })
}

export const down = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.removeColumn('games', 'winning_color')
  await queryInterface.sequelize.query('drop type enum_games_winning_color;')
  await queryInterface.addColumn('games', 'winner_id', {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' }
  })
  await queryInterface.removeColumn('games', 'white_name')
  await queryInterface.removeColumn('games', 'black_name')
  await queryInterface.changeColumn('games', 'white_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  })
  await queryInterface.changeColumn('games', 'black_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  })
}
