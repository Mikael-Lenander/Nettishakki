import { parseString } from './parsers'
import { Fields } from '../../types'
import { UserCredentials, NewUser } from 'shared'

export function toUserCredentials({ username, password }: Fields<UserCredentials>): UserCredentials {
  return {
    username: parseString(username, 'username'),
    password: parseString(password, 'password')
  }
}

export function toNewUser({ username, password, repeatPassword }: Fields<NewUser>): NewUser {
  return {
    ...toUserCredentials({ username, password }),
    repeatPassword: parseString(repeatPassword, 'password confirmation')
  }
}
