import prisma from "../../prisma"
import { ResolvePrismaRequest } from "../handling/handling"

export const selectEntrySettings = {
	id: true,
	name: true,
	personalPageId: true
}

export const CreateEntry = (
	name: string
) => {
	const request = prisma.entry.create({
		data: {
			name: name
		},
		select: selectEntrySettings,
	})
	return ResolvePrismaRequest(request)
}

// Read All
export const FindAllEntries = () => {
	const request = prisma.entry.findMany({
		select: selectEntrySettings
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const FindEntryById = (
	id: number
) => {
	const request = prisma.entry.findUniqueOrThrow({
		where: {
			id: id,
		},
		select: selectEntrySettings
	})
	return ResolvePrismaRequest(request)
}


// Update Entry
export const UpdateEntryById = (
	id: number,
	name: string,
	personalPageId: number
) => {
	const request = prisma.entry.update({
		where: {
			id: id
		},
		data: {
			name: name,
			personalPageId: personalPageId
		},
		select: selectEntrySettings
	})
	return ResolvePrismaRequest(request)
}


// Delete Entry By ID
export const DeleteEntryById = (
	id: number
) => {
	const request = prisma.entry.delete({
		where: {
			id: id
		},
		select: selectEntrySettings
	})
	return ResolvePrismaRequest(request)
}