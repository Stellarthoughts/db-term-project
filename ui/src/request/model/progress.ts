/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the Progress information from backend using /api/progress route and ParseProgress function

import { ParseProgress } from "../../types/dbparsers"
import { Progress } from "../../types/dbtypes"
import { DeleteRequest, generalHandling, GetRequest, PostRequest, PutRequest } from "../common"

export const GetAllProgreses = async (token: string) => {
	try {
		const response = await GetRequest("/api/progress", token)
		return (response.data.body as Array<any>).filter(x => ParseProgress(x))
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const GetProgressById = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/progress/${id}`, token)
		return ParseProgress(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const PostProgress = async (token: string, progress: Progress) => {
	try {
		const response = await PostRequest("/api/progress", token, progress)
		return ParseProgress(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const PutProgressById = async (token: string, progress: Progress) => {
	try {
		const response = await PutRequest(`/api/progress/${progress.id}`, token, progress)
		return ParseProgress(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const DeleteProgressById = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/progress/${id}`, token)

		return ParseProgress(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}