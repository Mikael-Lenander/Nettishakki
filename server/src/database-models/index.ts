import Game from './game'
import Move from './move'
import User from './user'
import Token from './token'

// @ts-ignore
User.hasMany(Game, {
  foreignKey: { name: 'whiteId' },
  as: 'white'
})
User.hasMany(Game, {
  foreignKey: { name: 'blackId' },
  as: 'black'
})

// @ts-ignore
Game.hasMany(Move, { foreignKey: { allowNull: false } })
Move.belongsTo(Game)

// @ts-ignore
User.hasOne(Token)
Token.belongsTo(User)

export { Move, User, Game, Token }
