import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

// Define a type for the slice state
export interface UserState {
	user: {
		id: number
		login: string
		token: string
		progress: {
			id: number,
			lastPageId: number | null
		}
		access: {
			id: number,
			canView: boolean,
			canEdit: boolean,
			canCreate: boolean,
			canDelete: boolean
		}
	} | null
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
		}
	}
})

export const { assignNewUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer