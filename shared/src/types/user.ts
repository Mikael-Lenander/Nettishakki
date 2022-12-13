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

export interface UserResponse extends UserPayload, Tokens {}
