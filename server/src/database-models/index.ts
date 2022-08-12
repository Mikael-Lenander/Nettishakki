import Game from './game'
import Move from './move'
import User from './user'

User.hasMany(Game, {
  foreignKey: { name: 'whiteId', allowNull: false },
  as: 'white'
})
User.hasMany(Game, {
  foreignKey: { name: 'blackId', allowNull: false },
  as: 'black'
})
User.hasMany(Game, { foreignKey: 'winnerId', as: 'winner' })

Game.hasMany(Move, { foreignKey: { allowNull: false } })
Move.belongsTo(Game)

export { Move, User, Game }
