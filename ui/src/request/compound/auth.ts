import axios from 'axios';
import { PostRequest, ResponseDataOrNull } from '../common';

export const RegisterUser = async (
	login: string,
	password: string
) => {
	try {
		const response = await PostRequest("/api/auth/register", {
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
		const response = await PostRequest("/api/auth/login", {
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