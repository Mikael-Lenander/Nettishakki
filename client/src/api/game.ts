import { URL } from '../constants'
import { axiosAuth } from './auth'
import { PlayerStats } from 'shared'

const get = async () => {
  const response = await axiosAuth.get<PlayerStats>(`${URL}/api/games`)
  console.log('games', response.data)
  return response.data
}

export default { get }
