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

interface selectThreadSettingsType {
	id: number,
	order: number,
	type: ThreadType,
	content: string,
	pageId: number,
}

const isPreserveThreadNeeded = async (thread: selectThreadSettingsType) => {
	const threads = await prisma.thread.findMany({
		where: {
			pageId: thread.pageId,
		},
		select: selectThreadSettings
	})
	let isPreserveNeeded = false
	for (let i = 0; i < threads.length - 1; i++) {
		if (threads[i].order != threads[i + 1].order - 1) {
			isPreserveNeeded = true
			break
		}
	}
	return isPreserveNeeded
}

const PreserveThreadOrder = async (
	thread: selectThreadSettingsType,
	deleted: boolean,
) => {
	if (!thread || !thread.pageId || !thread.order)
		return
	if (!await isPreserveThreadNeeded(thread))
		return
	await prisma.thread.updateMany({
		where: {
			pageId: thread.pageId,
			NOT: {
				id: thread.id
			},
			order: {
				gte: thread.order
			}
		},
		data: {
			order: {
				increment: deleted ? -1 : 1
			}
		}
	})
	const threads = await prisma.thread.findMany({
		where: {
			pageId: thread.pageId,
		},
		select: selectThreadSettings
	})
	const threadsSorted = threads.sort((a, b) => a.order - b.order)
	for (let i = 0; i < threadsSorted.length; i++) {
		await prisma.thread.update({
			where: {
				id: threadsSorted[i].id
			},
			data: {
				order: i + 1
			}
		})
	}
}


export const CreateThread = async (
	type: ThreadType,
	content: string,
	pageId: number,
	order: number
) => {
	const request = prisma.thread.create({
		data: {
			type: type,
			content: content,
			pageId: pageId,
			order: order
		},
		select: selectThreadSettings,
	})
	const resolved = await ResolvePrismaRequest(request)
	await PreserveThreadOrder(resolved, false)
	return resolved
}

// Read All
export const FindAllThreads = () => {
	const request = prisma.thread.findMany({
		select: selectThreadSettings
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const FindThreadById = (
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
export const UpdateThreadById = async (
	id: number,
	type: ThreadType,
	content: string,
	pageId: number,
	order: number
) => {
	const request = prisma.thread.update({
		where: {
			id: id
		},
		data: {
			type: type,
			content: content,
			pageId: pageId,
			order: order
		},
		select: selectThreadSettings
	})
	const resolved = await ResolvePrismaRequest(request)
	await PreserveThreadOrder(resolved, false)
	return resolved
}


// Delete Thread By ID
export const DeleteThreadById = async (
	id: number
) => {
	const request = prisma.thread.delete({
		where: {
			id: id
		},
		select: selectThreadSettings
	})
	const resolved = await ResolvePrismaRequest(request)
	await PreserveThreadOrder(resolved, false)
	return resolved
}