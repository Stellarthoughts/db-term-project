import { PostRequestNoToken, ResponseDataOrNull } from '../common';

export const RegisterUser = async (
	login: string,
	password: string
) => {
	try {
		const response = await PostRequestNoToken("/api/auth/register", {
			login: login,
			password: password
		})
		return ResponseDataOrNull(response)
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
		return ResponseDataOrNull(response)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}