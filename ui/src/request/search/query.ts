/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParseChapter, ParseEntry } from "../../types/dbparsers"
import { Chapter, Entry } from "../../types/dbtypes"
import { generalHandling, GetRequest } from "../common"

interface SearchResults {
	entries: Array<Entry>
	chapters: Array<Chapter>
}

export const GetSearchResults = async (token: string, query: string) => {
	try {
		const response = await GetRequest(`/api/query/${query}`, token)
		const body = response.data.body
		const res: SearchResults = {
			entries: (body.entries as Array<any>).filter(x => ParseEntry(x)),
			chapters: (body.chapters as Array<any>).filter(x => ParseChapter(x)),
		}
		return res
	}
	catch (err) {
		return generalHandling(err)
	}
}