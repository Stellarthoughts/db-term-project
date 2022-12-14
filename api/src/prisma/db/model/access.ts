import prisma from "../../prisma"
import { ResolvePrismaRequest } from "../handling/handling"

export const selectAccessSettings = {
	id: true,
	canView: true,
	canEdit: true,
	canCreate: true,
	canDelete: true
}

export const CreateAccess = (
	canView: boolean,
	canEdit: boolean,
	canCreate: boolean,
	canDelete: boolean
) => {
	const request = prisma.access.create({
		data: {
			canView: canView,
			canEdit: canEdit,
			canCreate: canCreate,
			canDelete: canDelete
		},
		select: selectAccessSettings,
	})
	return ResolvePrismaRequest(request)
}

// Read All
export const FindAllAccesses = () => {
	const request = prisma.access.findMany({
		select: selectAccessSettings
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const FindAccessById = (
	id: number
) => {
	const request = prisma.access.findUniqueOrThrow({
		where: {
			id: id,
		},
		select: selectAccessSettings
	})
	return ResolvePrismaRequest(request)
}


// Update Access
export const UpdateAccessById = (
	id: number,
	canView: boolean,
	canEdit: boolean,
	canCreate: boolean,
	canDelete: boolean
) => {
	const request = prisma.access.update({
		where: {
			id: id
		},
		data: {
			canView: canView,
			canEdit: canEdit,
			canCreate: canCreate,
			canDelete: canDelete
		},
		select: selectAccessSettings
	})
	return ResolvePrismaRequest(request)
}

// Delete Access By ID
export const DeleteAccessById = (
	id: number
) => {
	const request = prisma.access.delete({
		where: {
			id: id
		},
		select: selectAccessSettings
	})
	return ResolvePrismaRequest(request)
}