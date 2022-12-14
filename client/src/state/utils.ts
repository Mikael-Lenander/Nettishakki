import { createAsyncThunk, Action, AnyAction } from '@reduxjs/toolkit'

export const createAsyncThunkWithCustomError = <T, P>(typePrefix: string, action: (params: P) => Promise<T>) => {
  return createAsyncThunk(typePrefix, async (params: P, { rejectWithValue }): Promise<T> => {
    try {
      return await action(params)
    } catch (error) {
      throw rejectWithValue(error.response.data.error)
    }
  })
}

interface RejectedAction extends Action {
  payload: string
}

export const isRejectedAction = (action: AnyAction): action is RejectedAction => {
  return action.type.endsWith('rejected')
}
