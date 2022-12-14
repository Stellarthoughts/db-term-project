import prisma from "../../prisma"
import { ResolvePrismaRequest } from "../handling/handling"
import { selectChapterSettings } from "../model/chapter"
import { selectPageSettings } from "../model/page"
import { selectThreadSettings } from "../model/thread"

const selectEntrySettings = {
	id: true,
	name: true,
	personalPageId: true,
	chapters: {
		select: selectChapterSettings
	}
}

const selectCompoundChapterSettings = {
	id: true,
	order: true,
	name: true,
	personalPageId: true,
	entryId: true,
	pages: {
		select: selectPageSettings
	}
}

const selectCompoundPageSettings = {
	id: true,
	order: true,
	chapterId: true,
	threads: {
		select: selectThreadSettings
	}
}

export const FindAllEntriesAndChapters = () => {
	const request = prisma.entry.findMany({
		select: selectEntrySettings
	})
	return ResolvePrismaRequest(request)
}

export const FindPagesInChapter = (
	id: number
) => {
	const request = prisma.chapter.findUniqueOrThrow({
		where: {
			id: id
		},
		select: selectCompoundChapterSettings
	})
	return ResolvePrismaRequest(request)
}

export const FindThreadsInPage = (
	id: number
) => {
	const request = prisma.page.findUniqueOrThrow({
		where: {
			id: id
		},
		select: selectCompoundPageSettings
	})
	return ResolvePrismaRequest(request)
}

export const FindChaptersInEntry = (
	id: number
) => {
	const request = prisma.entry.findUniqueOrThrow({
		where: {
			id: id
		},
		select: selectEntrySettings
	})
	return ResolvePrismaRequest(request)
}