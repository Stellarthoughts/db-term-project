import prisma from "../../prisma"
import { ResolvePrismaRequest } from "../handling/handling"

export const selectPageSettings = {
	id: true,
	order: true,
	chapterId: true
}

interface selectPageSettingsType {
	id: number,
	order: number,
	chapterId: number
}

const IsPreservePageNeeded = async (page: selectPageSettingsType) => {
	const pages = await prisma.page.findMany({
		where: {
			chapterId: page.chapterId,
		},
		select: selectPageSettings
	})
	let isPreserveNeeded = false
	for (let i = 0; i < pages.length - 1; i++) {
		if (pages[i].order != pages[i + 1].order - 1) {
			isPreserveNeeded = true
			break
		}
	}
	return isPreserveNeeded
}

const PreservePageOrder = async (
	page: selectPageSettingsType,
	deleted: boolean,
) => {
	if (!page || !page.chapterId || !page.order)
		return
	if (!await IsPreservePageNeeded(page))
		return
	await prisma.page.updateMany({
		where: {
			chapterId: page.chapterId,
			NOT: {
				id: page.id
			},
			order: {
				gte: page.order
			}
		},
		data: {
			order: {
				increment: deleted ? -1 : 1
			}
		}
	})
	const pages = await prisma.page.findMany({
		where: {
			chapterId: page.chapterId,
		},
		select: selectPageSettings
	})
	const pagesSorted = pages.sort((a, b) => a.order - b.order)
	for (let i = 0; i < pagesSorted.length; i++) {
		await prisma.page.update({
			where: {
				id: pagesSorted[i].id
			},
			data: {
				order: i
			}
		})
	}
}

export const CreatePage = async (
	chapterId: number | null,
	order: number
) => {
	const request = prisma.page.create({
		data: {
			chapterId: chapterId,
			order: order
		},
		select: selectPageSettings,
	})
	const resolved = await ResolvePrismaRequest(request)
	await PreservePageOrder(resolved, false)
	return resolved
}

// Read All
export const FindAllPages = () => {
	const request = prisma.page.findMany({
		select: selectPageSettings
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const FindPageById = (
	id: number
) => {
	const request = prisma.page.findUniqueOrThrow({
		where: {
			id: id,
		},
		select: selectPageSettings
	})
	return ResolvePrismaRequest(request)
}


// Update Page
export const UpdatePageById = async (
	id: number,
	chapterId: number,
	order: number
) => {
	const request = prisma.page.update({
		where: {
			id: id
		},
		data: {
			chapterId: chapterId,
			order: order
		},
		select: selectPageSettings
	})
	const resolved = await ResolvePrismaRequest(request)
	await PreservePageOrder(resolved, false)
	return resolved
}


// Delete Page By ID
export const DeletePageById = async (
	id: number
) => {
	const request = prisma.page.delete({
		where: {
			id: id
		},
		select: selectPageSettings
	})
	const resolved = await ResolvePrismaRequest(request)
	await PreservePageOrder(resolved, true)
	return resolved
}