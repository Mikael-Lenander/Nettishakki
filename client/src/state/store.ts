import { configureStore, AnyAction } from '@reduxjs/toolkit'
import { Reducer, combineReducers } from 'redux'
import gameReducer from './reducers/gameReducer'
import userReducer from './reducers/userReducer'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
// import localStorage from 'redux-persist/lib/storage'
import { STORAGE_PREFIX } from '../constants'
import { WebStorage } from 'redux-persist/es/types'

const persistedReducer = <T>(key: string, reducer: Reducer<T, AnyAction>, storage: WebStorage) =>
  persistReducer({ key: STORAGE_PREFIX + key, storage }, reducer)

const rootReducer = combineReducers({
  // game: persistedReducer('game', gameReducer, sessionStorage),
  game: persistReducer({ key: STORAGE_PREFIX + 'game', storage: sessionStorage }, gameReducer),
  user: persistedReducer('user', userReducer, sessionStorage)
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
