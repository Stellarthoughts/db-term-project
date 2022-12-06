import React from "react";
import authContext from "./context";
import { fakeAuthProvider } from "./fakeAuth";


export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = React.useState<any>(null);

	const signin = (newUser: string, callback: VoidFunction) => {
		return fakeAuthProvider.signin(() => {
			setUser(newUser);
			callback();
		});
	};

	const signout = (callback: VoidFunction) => {
		return fakeAuthProvider.signout(() => {
			setUser(null);
			callback();
		});
	};

	const value = { user, signin, signout };

	return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default AuthProvider