import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import alertReducer from './alertSlice'

const persistConfig = {
	key: 'root',
	storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
	reducer: {
		user: persistedUserReducer,
		alert: alertReducer
	},
	middleware: [thunk]
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch