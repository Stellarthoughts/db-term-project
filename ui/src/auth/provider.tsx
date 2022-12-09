import React, { useState } from "react"
import authContext from "./context"
import { fakeAuthProvider } from "./fakeAuth"


export function AuthProvider({ children }: { children: React.ReactNode }) {
	const userRef = React.useRef<string | null>(null)
	const [user, setUser] = useState<string | null>(userRef.current)

	const signin = (newUser: string, callback: VoidFunction) => {
		return fakeAuthProvider.signin(() => {
			userRef.current = newUser
			setUser(userRef.current)
			callback()
		})
	}

	const signout = (callback: VoidFunction) => {
		return fakeAuthProvider.signout(() => {
			userRef.current = null
			setUser(userRef.current)
			callback()
		})
	}

	const value = { user, signin, signout }

	return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default AuthProvider