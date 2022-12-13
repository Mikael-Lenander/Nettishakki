export interface NewUser {
  username: string
  password: string
  repeatPassword: string
}

export type UserCredentials = Omit<NewUser, 'repeatPassword'>
