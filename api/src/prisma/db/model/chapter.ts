import prisma from "../../prisma"
import { ResolvePrismaRequest } from "../handling/handling"

export const selectChapterSettings = {
	id: true,
	order: true,
	name: true,
	personalPageId: true,
	entryId: true
}

interface selectChapterSettingsType {
	id: number,
	order: number,
	name: string,
	personalPageId: number,
	entryId: number
}

const isPreserveChapterNeeded = async (chapter: selectChapterSettingsType) => {
	const chapters = await prisma.chapter.findMany({
		where: {
			entryId: chapter.entryId,
		},
		select: selectChapterSettings
	})
	const chapterSorted = chapters.sort((a, b) => a.order - b.order)
	let isPreserveNeeded = false
	for (let i = 0; i < chapterSorted.length - 1; i++) {
		if (chapterSorted[i].order != chapterSorted[i + 1].order - 1) {
			isPreserveNeeded = true
			break
		}
	}
	return isPreserveNeeded
}

const PreserveChapterOrder = async (
	chapter: selectChapterSettingsType,
	deleted: boolean,
) => {
	if (!chapter || !chapter.entryId || !chapter.order)
		return
	if (!await isPreserveChapterNeeded(chapter))
		return
	await prisma.chapter.updateMany({
		where: {
			entryId: chapter.entryId,
			NOT: {
				id: chapter.id
			},
			order: {
				gte: chapter.order
			}
		},
		data: {
			order: {
				increment: deleted ? -1 : 1
			}
		}
	})
	const chapters = await prisma.chapter.findMany({
		where: {
			entryId: chapter.entryId,
		},
		select: selectChapterSettings
	})
	const chapterSorted = chapters.sort((a, b) => a.order - b.order)
	for (let i = 0; i < chapterSorted.length; i++) {
		await prisma.chapter.update({
			where: {
				id: chapterSorted[i].id
			},
			data: {
				order: i
			}
		})
	}
}

export const CreateChapter = async (
	name: string,
	entryId: number,
	personalPageId: number | null,
	order: number
) => {
	const request = prisma.chapter.create({
		data: {
			name: name,
			entryId: entryId,
			personalPageId: personalPageId,
			order: order
		},
		select: selectChapterSettings,
	})
	const resolved = await ResolvePrismaRequest(request)
	await PreserveChapterOrder(resolved, false)
	return resolved
}

// Read All
export const FindAllChapters = () => {
	const request = prisma.chapter.findMany({
		select: selectChapterSettings
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const FindChapterById = (
	id: number
) => {
	const request = prisma.chapter.findUniqueOrThrow({
		where: {
			id: id,
		},
		select: selectChapterSettings
	})
	return ResolvePrismaRequest(request)
}


// Update Chapter
export const UpdateChapterById = async (
	id: number,
	name: string,
	entryId: number,
	personalPageId: number,
	order: number
) => {
	const request = prisma.chapter.update({
		where: {
			id: id
		},
		data: {
			name: name,
			entryId: entryId,
			personalPageId: personalPageId,
			order: order
		},
		select: selectChapterSettings
	})
	const resolved = await ResolvePrismaRequest(request)
	await PreserveChapterOrder(resolved, false)
	return resolved
}


// Delete Chapter By ID
export const DeleteChapterById = async (
	id: number
) => {
	const request = prisma.chapter.delete({
		where: {
			id: id
		},
		select: selectChapterSettings
	})
	const resolved = await ResolvePrismaRequest(request)
	await PreserveChapterOrder(resolved, false)
	return resolved
}