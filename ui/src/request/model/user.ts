/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the User's information from backend using /api/user route and User model

import { ParseUser } from "../../types/dbparsers"
import { DeleteRequest, GetRequest, isFailed, PostRequest, PutRequest } from "../common"

export const GetUser = async (token: string) => {
	try {
		const response = await GetRequest("/api/user", token)
		if (isFailed(response))
			throw new Error("Response failed")
		return (response.data.body as Array<any>).filter(x => ParseUser(x))
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const GetUserID = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/user/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseUser(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const PostUser = async (
	token: string,
	login: string,
	password: string) => {
	try {
		const response = await PostRequest("/api/user", token, {
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

export const PutUserID = async (
	token: string,
	id: number,
	login: string,
	password: string) => {
	try {
		const response = await PutRequest(`/api/user/${id}`, token, {
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

export const DeleteUserID = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/user/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseUser(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}