
import { ParseUser } from '../../types/dbparsers'
import { generalHandling, PostRequestNoToken } from '../common'

export const RegisterUser = async (
	login: string,
	password: string
) => {
	try {
		const response = await PostRequestNoToken("/api/auth/register", {
			login: login,
			password: password
		})
		return ParseUser(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const LoginUser = async (
	login: string,
	password: string
) => {
	try {
		const response = await PostRequestNoToken("/api/auth/login", {
			login: login,
			password: password
		})
		return ParseUser(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}