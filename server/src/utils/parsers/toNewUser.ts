import { NewUser } from '../../types'
import { parseString } from './parsers'

export type UserFields = { username?: unknown; password?: unknown; repeatPassword?: unknown }

export default function toNewUser({ username, password, repeatPassword }: UserFields): NewUser {
  return {
    username: parseString(username, 'username'),
    password: parseString(password, 'password'),
    repeatPassword: parseString(repeatPassword, 'password confirmation')
  }
}
