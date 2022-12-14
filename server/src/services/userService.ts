import { NewUser } from 'shared'
import { hash } from 'bcrypt'
import { User } from '../database-models'

const create = async (newUser: NewUser) => {
  const passwordHash = await hash(newUser.password, 10)
  await User.create({ username: newUser.username, passwordHash })
}

const find = (username: string): Promise<User> => {
  return User.findOne({ where: { username } })
}

export default { create, find }
