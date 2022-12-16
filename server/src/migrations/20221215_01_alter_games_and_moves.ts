import { DataTypes, QueryInterface } from 'sequelize'
import { GameOverCondition } from 'shared'

export const up = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.removeColumn('games', 'draw')
  await queryInterface.addColumn('games', 'over_message', {
    type: DataTypes.ENUM,
    values: Object.values(GameOverCondition),
    allowNull: false
  })
  await queryInterface.dropTable('moves')
  await queryInterface.createTable('moves', {
    index: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    old_pos: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    new_pos: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    game_id: {
      type: DataTypes.INTEGER,
      references: { model: 'games', key: 'id' },
      primaryKey: true
    }
  })
}

export const down = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.dropTable('moves')
  await queryInterface.createTable('moves', {
    index: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    old_pos: {
      type: DataTypes.STRING(2),
      primaryKey: true
    },
    new_pos: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    game_id: {
      type: DataTypes.INTEGER,
      references: { model: 'games', key: 'id' },
      primaryKey: true
    }
  })
  await queryInterface.removeColumn('games', 'over_message')
  await queryInterface.sequelize.query('drop type enum_games_over_message;')
  await queryInterface.addColumn('games', 'draw', {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  })
}
