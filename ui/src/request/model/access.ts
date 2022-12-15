/* eslint-disable @typescript-eslint/no-explicit-any */
// Write an API to get the Access information from backend using /api/access route and ParseAccess function

import { ParseAccess } from "../../types/dbparsers"
import { DeleteRequest, generalHandling, GetRequest, PostRequest, PutRequest } from "../common"

export const GetAllAccesses = async (token: string) => {
	try {
		const response = await GetRequest("/api/access", token)
		return (response.data.body as Array<any>).filter(x => ParseAccess(x))
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const GetAccessById = async (token: string, id: number) => {
	try {
		const response = await GetRequest(`/api/access/${id}`, token)
		return ParseAccess(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
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
		return ParseAccess(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const PutAccessById = async (
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
		return ParseAccess(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}
}

export const DeleteAccessById = async (token: string, id: number) => {
	try {
		const response = await DeleteRequest(`/api/access/${id}`, token)
		return ParseAccess(response.data.body)
	}
	catch (err) {
		return generalHandling(err)
	}

}