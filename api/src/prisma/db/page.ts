import prisma from "../prisma"
import { ResolvePrismaRequest } from "./handling/handling"

const selectPageSettings = {
	id: true,
	order: true,
	chapterId: true
}

export const CreatePage = (
	chapterId: number
) => {
	const request = prisma.page.create({
		data: {
			chapterId: chapterId
		},
		select: selectPageSettings,
	})
	return ResolvePrismaRequest(request)
}

// Read All
export const FindAllPages = () => {
	const request = prisma.page.findMany({
		select: selectPageSettings
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const FindPageByID = (
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
export const UpdatePageByID = (
	id: number,
	chapterId: number
) => {
	const request = prisma.page.update({
		where: {
			id: id
		},
		data: {
			chapterId: chapterId,
		},
		select: selectPageSettings
	})
	return ResolvePrismaRequest(request)
}


// Delete Page By ID
export const DeletePageByID = (
	id: number
) => {
	const request = prisma.page.delete({
		where: {
			id: id
		},
		select: selectPageSettings
	})
	return ResolvePrismaRequest(request)
}