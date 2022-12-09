import React, { useState } from "react"
import { LoginUser, RegisterUser } from "../request/compound/auth"
import authContext from "./context"
import { SavedUser } from "./contextType"

function ParseUser(data: any) {
	return {
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const userRef = React.useRef<SavedUser | null>(null)
	const [user, setUser] = useState<SavedUser | null>(userRef.current)

	const register = async (user: {
		login: string,
		password: string
	}, callback: VoidFunction) => {
		const result = await RegisterUser(user.login, user.password)
		const newUser = ParseUser(result.body)
		userRef.current = newUser
		setUser(newUser)
		callback()
	}

	const signin = async (user: {
		login: string,
		password: string
	}, callback: VoidFunction) => {
		const result = await LoginUser(user.login, user.password)
		const newUser = ParseUser(result.body)
		userRef.current = newUser
		setUser(newUser)
		callback()
	}

	const signout = (callback: VoidFunction) => {
		userRef.current = null
		setUser(null)
		callback()
		return
	}

	const value = { user, register, signin, signout }

	return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default AuthProvider