import * as jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from './config'
import { Request, Response, NextFunction } from 'express'
import { UserPayload } from 'shared'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.substring(7)
  console.log('token', token)
  if (token == null) return res.status(401).json({ error: 'Unauthorized' })

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    console.log('err', err)
    if (err) return res.status(403).json({ error: 'Unauthorized' })
    req.user = user as UserPayload
    next()
  })
}
