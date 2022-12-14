/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the Chapter information from backend using /api/chapter route, ParseChapter function
// and dbtypes.ts for arguments

import { ParseChapter } from "../../types/dbparsers"
import { DeleteRequest, GetRequest, isFailed, PostRequest, PutRequest } from "../common"

export const GetAllChapters = async (token: string) => {
	try {
		const response = await GetRequest("/api/chapter", token)
		if (isFailed(response))
			throw new Error("Response failed")
		return (response.data.body as Array<any>).filter(x => ParseChapter(x))
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const GetChapterById = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/chapter/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseChapter(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const PostChapter = async (
	token: string,
	order: number,
	name: string,
	personalPageId: number | null,
	entryId: number) => {
	try {
		const response = await PostRequest("/api/chapter", token, {
			order: order,
			name: name,
			personalPageId: personalPageId,
			entryId: entryId
		})
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseChapter(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const PutChapterById = async (
	token: string,
	id: number,
	order: number,
	name: string,
	personalPageId: number | null,
	entryId: number) => {
	try {
		const response = await PutRequest(`/api/chapter/${id}`, token, {
			order: order,
			name: name,
			personalPageId: personalPageId,
			entryId: entryId
		})
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseChapter(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const DeleteChapterById = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/chapter/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return true
	}
	catch (err) {
		console.log(err)
		throw err
	}
}