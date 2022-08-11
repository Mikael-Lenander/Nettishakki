import { DataTypes, QueryInterface } from 'sequelize'

export const up = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }) 
  await queryInterface.createTable('games', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    draw: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    white_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    black_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    winner_id: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' }
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  })
  await queryInterface.createTable('moves', {
    index: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    old_pos_x: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    old_pos_y: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    new_pos_x: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    new_pos_y: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    game_id: {
      type: DataTypes.INTEGER,
      references: { model: 'games', key: 'id' },
      allowNull: false
    }
  })
}

export const down = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.dropTable('moves')
  await queryInterface.dropTable('games')
  await queryInterface.dropTable('users')
}