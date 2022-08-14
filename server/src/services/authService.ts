import { NewUser } from '../types'
import { hash } from 'bcrypt'
import { User } from '../database-models'

const createUser = async (newUser: NewUser) => {
  const passwordHash = await hash(newUser.password, 10)
  await User.create({ username: newUser.username, passwordHash })
}

export default { createUser }
