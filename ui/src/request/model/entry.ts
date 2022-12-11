/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the Entry information from backend using /api/entry route, ParseEntry function
// and dbtypes.ts for arguments
import { ParseEntry } from "../../types/dbparsers"
import { DeleteRequest, GetRequest, isFailed, PostRequest, PutRequest } from "../common"

export const GetEntry = async (token: string) => {
	try {
		const response = await GetRequest("/api/entry", token)
		if (isFailed(response))
			throw new Error("Response failed")
		return (response.data.body as Array<any>).filter(x => ParseEntry(x))
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const GetEntryID = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/entry/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseEntry(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const PostEntry = async (
	token: string,
	name: string,
	personalPageId: number | null) => {
	try {
		const response = await PostRequest("/api/entry", token, {
			name: name,
			personalPageId: personalPageId
		})
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseEntry(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const PutEntryID = async (
	token: string,
	id: number,
	name: string,
	personalPageId: number | null) => {
	try {
		const response = await PutRequest(`/api/entry/${id}`, token, {
			name: name,
			personalPageId: personalPageId
		})
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseEntry(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const DeleteEntryID = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/entry/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseEntry(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}