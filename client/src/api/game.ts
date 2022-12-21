import { URL } from '../constants'
import { axiosAuth } from './auth'

const get = async () => {
  const response = await axiosAuth.get(`${URL}/api/games`)
  console.log('games', response.data)
  return response.data
}

export default { get }
