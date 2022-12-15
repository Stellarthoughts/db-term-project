/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the Page information from backend using /api/page route, ParsePage function
// and dbtypes.ts for arguments

import { ParsePage } from "../../types/dbparsers"
import { DeleteRequest, generalHandling, GetRequest, PostRequest, PutRequest } from "../common"

export const GetAllPages = async (token: string) => {
	try {
		const response = await GetRequest("/api/page", token)

		return (response.data.body as Array<any>).filter(x => ParsePage(x))
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const GetPageById = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/page/${id}`, token)

		return ParsePage(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const PostPage = async (
	token: string,
	order: number,
	chapterId: number) => {
	try {
		const response = await PostRequest("/api/page", token, {
			order: order,
			chapterId: chapterId
		})

		return ParsePage(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const PutPageById = async (
	token: string,
	id: number,
	order: number,
	chapterId: number) => {
	try {
		const response = await PutRequest(`/api/page/${id}`, token, {
			order: order,
			chapterId: chapterId
		})

		return ParsePage(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const DeletePageById = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/page/${id}`, token)

		return ParsePage(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}