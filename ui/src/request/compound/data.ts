/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParseEntry, ParsePage, ParseThread } from "../../types/dbparsers"
import { generalHandling, GetRequest } from "../common"

export const GetTree = async (token: string) => {
	try {
		const response = await GetRequest("/api/data/tree", token)
		return (response.data.body as Array<any>).filter(x => ParseEntry(x))
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const GetChaptersByEntryId = async (token: string, entryId: number) => {
	try {
		const response = await GetRequest(`/api/data/chapters/${entryId}`, token)
		return (response.data.body as Array<any>).filter(x => ParseEntry(x))
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const GetPagesByChapterId = async (token: string, chapterId: number) => {
	try {
		const response = await GetRequest(`/api/data/pages/${chapterId}`, token)
		return (response.data.body as Array<any>).filter(x => ParsePage(x))
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const GetThreadsByPageId = async (token: string, pageId: number) => {
	try {
		const response = await GetRequest(`/api/data/threads/${pageId}`, token)
		return (response.data.body as Array<any>).filter(x => ParseThread(x))
	}
	catch (err) {
		return generalHandling(err)
	}
}