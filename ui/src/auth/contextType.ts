export interface AuthContextType {
	register: (user: {
		login: string,
		password: string
	}, callback: VoidFunction) => void
	signin: (user: {
		login: string,
		password: string
	}, callback: VoidFunction) => void
	signout: (callback: VoidFunction) => void
}

export default AuthContextType

