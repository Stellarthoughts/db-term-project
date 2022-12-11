/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the Access information from backend using /api/access route and ParseAccess function

import { ParseAccess } from "../../types/dbparsers"
import { DeleteRequest, GetRequest, isFailed, PostRequest, PutRequest } from "../common"

export const GetAccess = async (token: string) => {
	try {
		const response = await GetRequest("/api/access", token)
		if (isFailed(response))
			throw new Error("Response failed")
		return (response.data.body as Array<any>).filter(x => ParseAccess(x))
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const GetAccessID = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/access/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseAccess(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const PostAccess = async (
	token: string,
	canView: boolean,
	canEdit: boolean,
	canDelete: boolean,
	canCreate: boolean,
) => {
	try {
		const response = await PostRequest("/api/access", token, {
			canView: canView,
			canEdit: canEdit,
			canDelete: canDelete,
			canCreate: canCreate,
		})
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseAccess(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const PutAccessID = async (
	token: string,
	id: number,
	canView: boolean,
	canEdit: boolean,
	canDelete: boolean,
	canCreate: boolean,
) => {
	try {
		const response = await PutRequest(`/api/access/${id}`, token, {
			canView: canView,
			canEdit: canEdit,
			canDelete: canDelete,
			canCreate: canCreate,
		})
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseAccess(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}

export const DeleteAccessID = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/access/${id}`, token)
		if (isFailed(response))
			throw new Error("Response failed")
		return ParseAccess(response.data.body)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}