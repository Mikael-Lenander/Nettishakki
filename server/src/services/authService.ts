import { Token } from '../database-models'
import { UserPayload, Tokens } from '../types'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../utils/config'
import * as jwt from 'jsonwebtoken'

const addToken = async (token: string, userId: number) => {
  return Token.create({ token, userId })
}

const removeToken = async (token: string) => {
  return Token.destroy({ where: { token } })
}

const removeUserTokens = async (userId: number) => {
  return Token.destroy({ where: { userId } })
}

const isValidToken = async (token: string): Promise<boolean> => {
  return Boolean(await Token.findOne({ where: { token } }))
}

const generateTokens = async (user: UserPayload): Promise<Tokens> => {
  const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET)
  await addToken(refreshToken, user.id)
  return { accessToken, refreshToken }
}

export default { removeToken, isValidToken, removeUserTokens, generateTokens }
