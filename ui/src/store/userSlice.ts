import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Access, User } from '../types/dbtypes'
import { RootState } from './store'

// Define a type for the slice state
export interface UserState {
	user: User | null
}

// Define the initial state using that type
const initialState: UserState = {
	user: null
}

export const userSlice = createSlice({
	name: 'user',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		assignNewUser: (state, action: PayloadAction<UserState>) => {
			state.user = action.payload.user
		},
		assignNewAccess: (state, action: PayloadAction<Access>) => {
			if (!state.user)
				return
			state.user.access = action.payload
		},
	}
})

export const { assignNewUser, assignNewAccess } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer