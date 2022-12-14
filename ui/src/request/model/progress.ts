/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the Progress information from backend using /api/progress route and ParseProgress function

import { ParseProgress } from "../../types/dbparsers"
import { DeleteRequest, GetRequest, isFailed, PostRequest, PutRequest } from "../common"

export const GetAllProgreses = async (token: string) => {
	try {
		const response = await GetRequest("/api/progress", token)
		if (isFailed(response))
			throw new Error("Response failed")
		return (response.data.body as Array<any>).filter(x => ParseProgress(x))
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const GetProgressById = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/progress/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseProgress(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const PostProgress = async (token: string, lastPageId: number) => {
	try {
		const response = await PostRequest("/api/progress", token, {
			lastPageId: lastPageId
		})
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseProgress(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const PutProgressById = async (token: string, id: number, lastPageId: number) => {
	try {
		const response = await PutRequest(`/api/progress/${id}`, token, {
			lastPageId: lastPageId
		})
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseProgress(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const DeleteProgressById = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/progress/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseProgress(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}