import dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken'

dotenv.config()

export const DATABASE_URL = process.env.DATABASE_URL
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as Secret
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as Secret
