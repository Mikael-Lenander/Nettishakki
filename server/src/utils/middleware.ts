import * as jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from './config'
import { Request, Response, NextFunction } from 'express'
import { UserPayload } from 'shared'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']?.substring(7)
    const user = verifyToken(token)
    req.user = user
    next()
  } catch (error) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
}

export const verifyToken = (token: string): UserPayload => {
  if (token == null) throw Error('Unauthorized')
  let user: UserPayload = null
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, payload: UserPayload) => {
    if (err) throw Error('Unauthorized')
    user = payload
  })
  if (user == null) throw Error('Unauthorized')
  return user
}
