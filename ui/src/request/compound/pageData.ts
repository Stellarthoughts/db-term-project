/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParseChapter, ParseEntry, ParsePage, ParseThread } from "../../types/dbparsers"
import { Chapter, Entry, Page, Thread } from "../../types/dbtypes"
import { GetRequest, isFailed } from "../common"

export const GetGenericPageData = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/pageData/generic/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		const body = response.data.body
		const data: GenericPageData = {
			pageData: body.pageData ? ParsePage(body.pageData) : null,
			threadsData: body.threadsData ? (body.threadsData as Array<any>).map(x => ParseThread(x)) : null,
			chapterData: body.chapterData ? ParseChapter(body.chapterData) : null,
			otherPagesData: body.otherPagesData ? (body.otherPagesData as Array<any>).map(x => ParsePage(x)) : null,
		}
		return data
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

// get chapter data
export const GetChapterPageData = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/pageData/chapter/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		const body = response.data.body
		const data: ChapterPageData = {
			personalPageData: body.personalPageData ? ParsePage(body.personalPageData) : null,
			personalPageThreadsData: body.personalPageThreadsData ? (body.personalPageThreadsData as Array<any>).map(x => ParseThread(x)) : null,
			entryData: body.entryData ? ParseEntry(body.entryData) : null,
			otherChaptersData: body.otherChaptersData ? (body.otherChaptersData as Array<any>).map(x => ParseChapter(x)) : null,
			chapterData: body.chapterData ? ParseChapter(body.chapterData) : null,
			pagesData: body.pagesData ? (body.pagesData as Array<any>).map(x => ParsePage(x)) : null,
		}
		return data
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

// get entry page data
export const GetEntryPageData = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/pageData/entry/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		const body = response.data.body
		const data: EntryPageData = {
			personalPageData: body.personalPageData ? ParsePage(body.personalPageData) : null,
			personalPageThreadsData: body.personalPageThreadsData ? (body.personalPageThreadsData as Array<any>).map(x => ParseThread(x)) : null,
			entryData: body.entryData ? ParseEntry(body.entryData) : null,
			chaptersData: body.chaptersData ? (body.chaptersData as Array<any>).map(x => ParseChapter(x)) : null,
		}
		return data
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export interface ChapterPageData {
	personalPageData: Page | null
	personalPageThreadsData: Thread[] | null
	entryData: Entry | null
	otherChaptersData: Chapter[] | null
	chapterData: Chapter | null
	pagesData: Page[] | null
}

export interface EntryPageData {
	personalPageData: Page | null
	personalPageThreadsData: Thread[] | null
	entryData: Entry | null
	chaptersData: Chapter[] | null
}

export interface GenericPageData {
	pageData: Page | null
	threadsData: Thread[] | null
	chapterData: Chapter | null
	otherPagesData: Page[] | null
}

export const genericPageDataNull = {
	pageData: null,
	threadsData: null,
	chapterData: null,
	otherPagesData: null,
}

// entry null data
export const entryPageDataNull = {
	personalPageData: null,
	personalPageThreadsData: null,
	entryData: null,
	chaptersData: null,
}

// chapter null data
export const chapterPageDataNull = {
	personalPageData: null,
	personalPageThreadsData: null,
	entryData: null,
	otherChaptersData: null,
	chapterData: null,
	pagesData: null,
}