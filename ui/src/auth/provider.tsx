import React from "react"
import { useAppDispatch } from "../hooks/hooks"
import { LoginUser, RegisterUser } from "../request/compound/auth"
import { assignNewUser, UserState } from "../store/userSlice"
import authContext from "./context"

function ParseUser(data: any): UserState {
	return {
		user: {
			login: data.login,
			id: data.id,
			token: data.token,
			access: {
				id: data.access.id,
				canView: data.access.canView,
				canEdit: data.access.canEdit,
				canCreate: data.access.canCreate,
				canDelete: data.access.canDelete
			},
			progress: {
				id: data.progress.id,
				lastPageId: data.progress.lastPageId
			}
		}
	}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch()

	const register = async (user: {
		login: string,
		password: string
	}, callback: VoidFunction) => {
		const result = await RegisterUser(user.login, user.password)
		const newUser = ParseUser(result.body)
		dispatch(assignNewUser(newUser))
		callback()
	}

	const signin = async (user: {
		login: string,
		password: string
	}, callback: VoidFunction) => {
		const result = await LoginUser(user.login, user.password)
		const newUser = ParseUser(result.body)
		dispatch(assignNewUser(newUser))
		callback()
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