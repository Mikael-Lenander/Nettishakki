import { UserPayload } from 'shared'

export type Error = {
  error: string
}

export interface TokenPayload extends UserPayload {
  iat: number
  exp: number
}
