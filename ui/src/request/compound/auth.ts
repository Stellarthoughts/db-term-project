import { ParseUser } from '../../types/dbparsers';
import { PostRequestNoToken, isFailed } from '../common';

export const RegisterUser = async (
	login: string,
	password: string
) => {
	try {
		const response = await PostRequestNoToken("/api/auth/register", {
			login: login,
			password: password
		})
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseUser(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
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
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseUser(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}