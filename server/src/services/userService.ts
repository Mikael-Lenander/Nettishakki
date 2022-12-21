import { Color, NewUser } from 'shared'
import { hash } from 'bcrypt'
import { User } from '../database-models'
import { Op } from 'sequelize'
import ActiveGame from '../model/ActiveGame'

const create = async (newUser: NewUser) => {
  const passwordHash = await hash(newUser.password, 10)
  await User.create({ username: newUser.username, passwordHash })
}

async function findByName(username: string): Promise<User>
async function findByName(usernames: string[]): Promise<User[]>
async function findByName(usernames: string | string[]): Promise<User | User[]> {
  if (Array.isArray(usernames)) {
    // @ts-ignore
    const users = await User.findAll({
      where: {
        username: { [Op.in]: usernames }
      }
    })
    return users
  } else {
    const user = await User.findOne({ where: { username: usernames } })
    return user
  }
}

async function findById(id: number): Promise<User>
async function findById(id: number[]): Promise<User[]>
async function findById(id: number | number[]): Promise<User | User[]> {
  if (Array.isArray(id)) {
    // @ts-ignore
    const users = await User.findAll({
      where: {
        id: { [Op.in]: id }
      }
    })
    return users
  } else {
    const user = await User.findByPk(id)
    return user
  }
}

const findByColor = async (color: Color, activeGame: ActiveGame) => {
  const username = activeGame.playerWithColor(color).username
  const user = await findByName(username)
  return user
}

export default { create, findByName, findById, findByColor }
