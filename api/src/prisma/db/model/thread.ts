import prisma from "../../prisma"
import { ResolvePrismaRequest } from "../handling/handling"
import { ThreadType } from "@prisma/client"

export const selectThreadSettings = {
	id: true,
	order: true,
	type: true,
	content: true,
	pageId: true,
}

export const CreateThread = (
	type: ThreadType,
	content: string,
	pageId: number,
) => {
	const request = prisma.thread.create({
		data: {
			type: type,
			content: content,
			pageId: pageId
		},
		select: selectThreadSettings,
	})
	return ResolvePrismaRequest(request)
}

// Read All
export const FindAllThreads = () => {
	const request = prisma.thread.findMany({
		select: selectThreadSettings
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const FindThreadByID = (
	id: number
) => {
	const request = prisma.thread.findUniqueOrThrow({
		where: {
			id: id,
		},
		select: selectThreadSettings
	})
	return ResolvePrismaRequest(request)
}


// Update Thread
export const UpdateThreadByID = (
	id: number,
	type: ThreadType,
	content: string,
	pageId: number,
) => {
	const request = prisma.thread.update({
		where: {
			id: id
		},
		data: {
			type: type,
			content: content,
			pageId: pageId
		},
		select: selectThreadSettings
	})
	return ResolvePrismaRequest(request)
}


// Delete Thread By ID
export const DeleteThreadByID = (
	id: number
) => {
	const request = prisma.thread.delete({
		where: {
			id: id
		},
		select: selectThreadSettings
	})
	return ResolvePrismaRequest(request)
}