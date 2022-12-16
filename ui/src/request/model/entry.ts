/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the Entry information from backend using /api/entry route, ParseEntry function
// and dbtypes.ts for arguments
import { ParseEntry } from "../../types/dbparsers"
import { Entry } from "../../types/dbtypes"
import { DeleteRequest, generalHandling, GetRequest, PostRequest, PutRequest } from "../common"

export const GetAllEntries = async (token: string) => {
	try {
		const response = await GetRequest("/api/entry", token)

		return (response.data.body as Array<any>).filter(x => ParseEntry(x))
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const GetEntryById = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/entry/${id}`, token)

		return ParseEntry(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const PostEntry = async (
	token: string,
	entry: Entry
) => {
	try {
		const response = await PostRequest("/api/entry", token, entry)

		return ParseEntry(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const PutEntryById = async (
	token: string,
	entry: Entry
) => {
	try {
		const response = await PutRequest(`/api/entry/${entry.id}`, token, entry)

		return ParseEntry(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const DeleteEntryById = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/entry/${id}`, token)
		return ParseEntry(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}