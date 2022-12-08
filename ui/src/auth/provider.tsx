import React from "react"
import authContext from "./context"
import { fakeAuthProvider } from "./fakeAuth"


export function AuthProvider({ children }: { children: React.ReactNode }) {
	const user = React.useRef<any>(null)

	const signin = (newUser: string, callback: VoidFunction) => {
		return fakeAuthProvider.signin(() => {
			user.current = newUser
			callback()
		})
	}

	const signout = (callback: VoidFunction) => {
		return fakeAuthProvider.signout(() => {
			user.current = null
			callback()
		})
	}

	const value = { user, signin, signout }

	return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default AuthProvider