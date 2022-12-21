import { Router } from 'express'
import userService from '../services/userService'
import authService from '../services/authService'
import { toUserCredentials } from '../utils/parsers/toUser'
import { Fields } from '../types'
import { UserCredentials, UserPayload } from 'shared'
import { compare } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { REFRESH_TOKEN_SECRET } from '../utils/config'
import { parseString } from '../utils/parsers/parsers'

const router = Router()

router.post('/login', async (req, res) => {
  try {
    const credentials = toUserCredentials(req.body as Fields<UserCredentials>)
    const user = await userService.findByName(credentials.username)
    if (!user) return res.status(400).json({ error: 'Invalid username' })
    const passwordCorrect = await compare(credentials.password, user.passwordHash)
    if (!passwordCorrect) return res.status(401).json({ error: 'Wrong password' })
    const userPayload = { username: user.username, id: user.id }
    const tokens = await authService.generateTokens(userPayload)
    res.json({ ...tokens, ...userPayload })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.post('/logout', (req, res) => {
  try {
    const refreshToken = parseString(req.body?.refreshToken, 'refreshToken')
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(403).json({ error: 'Unauthorized' })
      const userId = (user as UserPayload).id
      await authService.removeUserTokens(userId)
      res.send('Logout successful')
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = parseString(req.body?.refreshToken, 'refreshToken')
    const tokenValid = await authService.isValidToken(refreshToken)
    if (!tokenValid) {
      console.log('Token not in database', refreshToken)
      return res.status(403).json({ error: 'Unauthorized' })
    }
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        console.log('Token not valid')
        return res.status(403).json({ error: 'Unauthorized' })
      }
      const userData = user as UserPayload
      const userPayload = { username: userData.username, id: userData.id }
      await authService.removeToken(refreshToken)
      const newTokens = await authService.generateTokens(userPayload)
      res.json({ ...newTokens, ...userPayload })
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
