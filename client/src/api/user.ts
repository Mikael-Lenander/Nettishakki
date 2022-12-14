import axios from 'axios'
import { NewUser, UserCredentials, UserResponse } from 'shared'
import { URL } from '../constants'

const login = async (credentials: UserCredentials) => {
  const response = await axios.post<UserResponse>(`${URL}/api/auth/login`, credentials)
  return response.data
}

const signup = async (newUser: NewUser) => {
  const response = await axios.post<string>(`${URL}/api/users`, newUser)
  return response.data
}

const logout = async (refreshToken: string) => {
  console.log('api logout')
  const response = await axios.post<string>(`${URL}/api/auth/logout`, { refreshToken })
  return response.data
}

export default { login, signup, logout }
