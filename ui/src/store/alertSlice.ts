import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface AlertInterface {
	show: boolean
	message: string
	manual: boolean
}
// Define a type for the slice state
export interface AlertState {
	success: AlertInterface
	failure: AlertInterface
	info: AlertInterface
	warning: AlertInterface
}

// Define the initial state using that type
export const initialState: AlertState = {
	success: {
		show: false,
		manual: false,
		message: "Success!",
	},
	failure: {
		show: false,
		manual: false,
		message: "Failure!",
	},
	info: {
		show: false,
		manual: false,
		message: "Info!"
	},
	warning: {
		show: false,
		manual: false,
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
		setInfo: (state, action: PayloadAction<AlertInterface>) => {
			state.info = action.payload
		},
		setWarning: (state, action: PayloadAction<AlertInterface>) => {
			state.warning = action.payload
		},
		// reset all alerts
		resetSuccess: (state) => {
			state.success = initialState.success
		},
		resetFailure: (state) => {
			state.failure = initialState.failure
		},
		resetInfo: (state) => {
			state.info = initialState.info
		},
		resetWarning: (state) => {
			state.warning = initialState.warning
		},
		// hide all alers
		hideSuccess: (state) => {
			if (!state.success.manual)
				state.success.show = false
		},
		hideFailure: (state) => {
			if (!state.failure.manual)
				state.failure.show = false
		},
		hideInfo: (state) => {
			if (!state.info.manual)
				state.info.show = false
		},
		hideWarning: (state) => {
			if (!state.warning.manual)
				state.warning.show = false
		},
		hideForceSuccess: (state) => {
			state.success.show = false
		},
		hideForceFailure: (state) => {
			state.failure.show = false
		},
		hideForceInfo: (state) => {
			state.info.show = false
		},
		hideForceWarning: (state) => {
			state.warning.show = false
		},
	}
})

export const { setSuccess, setFailure, setInfo, setWarning } = alertSlice.actions
export const { resetSuccess, resetFailure, resetInfo, resetWarning } = alertSlice.actions
export const { hideSuccess, hideFailure, hideInfo, hideWarning } = alertSlice.actions
export const { hideForceSuccess, hideForceFailure, hideForceInfo, hideForceWarning } = alertSlice.actions

export const selectAlert = (state: RootState) => state.alert

export default alertSlice.reducer