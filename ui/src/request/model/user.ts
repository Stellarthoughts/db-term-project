/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the User's information from backend using /api/user route and User model

import { ParseUser } from "../../types/dbparsers"
import { DeleteRequest, generalHandling, GetRequest, PostRequest, PutRequest } from "../common"

export const GetAllUsers = async (token: string) => {
	try {
		const response = await GetRequest("/api/user", token)
		return (response.data.body as Array<any>).filter(x => ParseUser(x))
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const GetUserById = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/user/${id}`, token)
		return ParseUser(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
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
		return ParseUser(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const PutUserById = async (
	token: string,
	id: number,
	login: string,
	password: string) => {
	try {
		const response = await PutRequest(`/api/user/${id}`, token, {
			login: login,
			password: password
		})
		return ParseUser(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const DeleteUserById = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/user/${id}`, token)
		return ParseUser(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}