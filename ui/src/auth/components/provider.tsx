import React from "react"
import { useAppDispatch } from "../../hooks/hooks"
import { LoginUser, RegisterUser } from "../../request/compound/auth"
import { assignNewUser } from "../../store/userSlice"
import authContext from "../context"

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch()

	const register = async (user: {
		login: string,
		password: string
	},
		callbackSuccess: VoidFunction,
		callbackFailure: VoidFunction) => {
		try {
			const result = await RegisterUser(user.login, user.password)
			const newUser = { user: result }
			dispatch(assignNewUser(newUser))
			callbackSuccess()
		}
		catch (err) {
			console.log(err)
			callbackFailure()
		}
	}

	const signin = async (user: {
		login: string,
		password: string
	},
		callbackSuccess: VoidFunction,
		callbackFailure: VoidFunction) => {
		try {
			const result = await LoginUser(user.login, user.password)
			const newUser = { user: result }
			dispatch(assignNewUser(newUser))
			callbackSuccess()
		}
		catch (err) {
			console.log(err)
			callbackFailure()
		}
	}

	const signout = (callback: VoidFunction) => {
		dispatch(assignNewUser({ user: null }))
		callback()
		return
	}

	const value = { register, signin, signout }

	return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default AuthProvider