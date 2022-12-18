import { ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { LoginUser, RegisterUser } from "../../request/compound/auth"
import { PutAccessById } from "../../request/model/access"
import { assignNewAccess, assignNewUser } from "../../store/userSlice"
import authContext from "../context"

export function AuthProvider({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.user.user)

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

	const superuser = async (callback: VoidFunction) => {
		if (!user)
			return
		if (!user.access)
			return
		try {
			const result = await PutAccessById(user.token, {
				id: user.access.id,
				canView: true,
				canEdit: true,
				canDelete: true,
				canCreate: true,
			})
			if (!result)
				return
			dispatch(assignNewAccess(result))
			console.log(user)
			callback()
		}
		catch (err) {
			console.log(err)
		}
	}

	const value = { register, signin, signout, superuser }

	return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default AuthProvider