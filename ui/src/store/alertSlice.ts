import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface AlertInterface {
	show: boolean
	message: string
}
// Define a type for the slice state
export interface AlertState {
	success: AlertInterface
	failure: AlertInterface
	info: AlertInterface
	warning: AlertInterface
}

// Define the initial state using that type
const initialState: AlertState = {
	success: {
		show: false,
		message: "Success!",
	},
	failure: {
		show: false,
		message: "Failure!",
	},
	info: {
		show: false,
		message: "Info!"
	},
	warning: {
		show: false,
		message: "Warning!"
	}
}

export const alertSlice = createSlice({
	name: 'alert',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		setSuccess: (state, action: PayloadAction<AlertInterface>) => {
			state.success = action.payload
		},
		setFailure: (state, action: PayloadAction<AlertInterface>) => {
			state.failure = action.payload
			console.log("failure set")
		},
		setInformation: (state, action: PayloadAction<AlertInterface>) => {
			state.info = action.payload
		},
		setWarning: (state, action: PayloadAction<AlertInterface>) => {
			state.warning = action.payload
		}
	}
})

export const { setSuccess, setFailure, setInformation, setWarning } = alertSlice.actions

export const selectAlert = (state: RootState) => state.alert

export default alertSlice.reducer