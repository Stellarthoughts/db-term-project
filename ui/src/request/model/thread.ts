/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the Thread information from backend using /api/thread route, ParseThread function
// and dbtypes.ts for arguments

import { ParseThread } from "../../types/dbparsers"
import { DeleteRequest, GetRequest, isFailed, PostRequest, PutRequest } from "../common"

export const GetAllThreads = async (token: string) => {
	try {
		const response = await GetRequest("/api/thread", token)
		if (isFailed(response))
			throw new Error("Response failed")
		return (response.data.body as Array<any>).filter(x => ParseThread(x))
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const GetThreadById = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/thread/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseThread(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const PostThread = async (
	token: string,
	order: number,
	type: string,
	content: string,
	pageId: number) => {
	try {
		const response = await PostRequest("/api/thread", token, {
			order: order,
			type: type,
			content: content,
			pageId: pageId
		})
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseThread(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const PutThreadById = async (
	token: string,
	id: number,
	order: number,
	type: string,
	content: string,
	pageId: number) => {
	try {
		const response = await PutRequest(`/api/thread/${id}`, token, {
			order: order,
			type: type,
			content: content,
			pageId: pageId
		})
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseThread(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const DeleteThreadById = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/thread/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseThread(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}
