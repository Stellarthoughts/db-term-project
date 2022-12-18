export interface AuthContextType {
	register: (user: {
		login: string,
		password: string
	}, callbackSuccess: VoidFunction, callbackFailure: VoidFunction) => void
	signin: (user: {
		login: string,
		password: string
	}, callbackSuccess: VoidFunction, callbackFailure: VoidFunction) => void
	superuser: (callback: VoidFunction) => void
	signout: (callback: VoidFunction) => void
}

export default AuthContextType

