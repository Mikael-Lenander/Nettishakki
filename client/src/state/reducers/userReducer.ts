import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

const initialState: User = {
  username: `guest_${uuid()}`
}

type User = {
  username: string
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})

export default userSlice.reducer