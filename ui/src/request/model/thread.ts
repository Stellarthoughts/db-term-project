/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the Thread information from backend using /api/thread route, ParseThread function
// and dbtypes.ts for arguments

import { ParseThread } from "../../types/dbparsers"
import { Thread } from "../../types/dbtypes"
import { DeleteRequest, generalHandling, GetRequest, PostRequest, PutRequest } from "../common"

export const GetAllThreads = async (token: string) => {
	try {
		const response = await GetRequest("/api/thread", token)
		return (response.data.body as Array<any>).filter(x => ParseThread(x))
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const GetThreadById = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/thread/${id}`, token)
		return ParseThread(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const PostThread = async (
	token: string,
	thread: Thread) => {
	try {
		const response = await PostRequest("/api/thread", token, thread)
		return ParseThread(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const PutThreadById = async (
	token: string,
	thread: Thread
) => {
	try {
		const response = await PutRequest(`/api/thread/${thread.id}`, token, thread)
		return ParseThread(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const DeleteThreadById = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/thread/${id}`, token)
		return ParseThread(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}
