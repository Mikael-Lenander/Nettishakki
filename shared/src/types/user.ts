export interface NewUser {
  username: string
  password: string
  repeatPassword: string
}

export type UserCredentials = Omit<NewUser, 'repeatPassword'>

export interface UserPayload {
  username: string
  id: number
}
export interface Tokens {
  accessToken: string
  refreshToken: string
}

export type UserResponse = UserPayload & Tokens

export interface TokenPayload extends UserPayload {
  iat: number
  exp: number
}
