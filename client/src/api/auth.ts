import { Store } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import jwtDecode from 'jwt-decode'
import { setTokens } from '../state/reducers/userReducer'
import { TokenPayload } from '../types'
import userApi from './user'

export const axiosAuth = axios.create()

let store: Store

export const injectStore = (_store: Store) => {
  store = _store
}

axiosAuth.interceptors.request.use(
  async config => {
    await refresh(config)
    console.log('axios interceptor done')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export const refresh = async (config?: AxiosRequestConfig<any>) => {
  const date = new Date()
  const user = store.getState().user
  if (user.accessToken == null) return
  const decodedToken = jwtDecode(user.accessToken) as TokenPayload
  if (decodedToken.exp * 1000 < date.getTime()) {
    const { accessToken, refreshToken } = await userApi.refreshToken(user.refreshToken)
    config.headers['Authorization'] = `Bearer ${accessToken}`
    store.dispatch(setTokens({ accessToken, refreshToken }))
  } else {
    config.headers['Authorization'] = `Bearer ${user.accessToken}`
  }
}
