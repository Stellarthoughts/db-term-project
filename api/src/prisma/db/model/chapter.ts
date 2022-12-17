import prisma from "../../prisma"
import { ResolvePrismaRequest } from "../handling/handling"

export const selectChapterSettings = {
	id: true,
	order: true,
	name: true,
	personalPageId: true,
	entryId: true
}

export const CreateChapter = (
	name: string,
	entryId: number
) => {
	const request = prisma.chapter.create({
		data: {
			name: name,
			entryId: entryId
		},
		select: selectChapterSettings,
	})
	return ResolvePrismaRequest(request)
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
export const UpdateChapterById = (
	id: number,
	name: string,
	entryId: number,
	personalPageId: number
) => {
	const request = prisma.chapter.update({
		where: {
			id: id
		},
		data: {
			name: name,
			entryId: entryId,
			personalPageId: personalPageId
		},
		select: selectChapterSettings
	})
	return ResolvePrismaRequest(request)
}


// Delete Chapter By ID
export const DeleteChapterById = (
	id: number
) => {
	const request = prisma.chapter.delete({
		where: {
			id: id
		},
		select: selectChapterSettings
	})
	return ResolvePrismaRequest(request)
}