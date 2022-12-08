import prisma from "../prisma"
import { ResolvePrismaRequest } from "./handling/handling"

export const selectProgressSettings = {
	id: true,
	lastPageId: true
}

export const CreateProgress = (
) => {
	const request = prisma.progress.create({
		data: {
		},
		select: selectProgressSettings,
	})
	return ResolvePrismaRequest(request)
}

// Read All
export const FindAllProgresses = () => {
	const request = prisma.progress.findMany({
		select: selectProgressSettings
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const FindProgressByID = (
	id: number
) => {
	const request = prisma.progress.findUniqueOrThrow({
		where: {
			id: id,
		},
		select: selectProgressSettings
	})
	return ResolvePrismaRequest(request)
}


// Update Progress
export const UpdateProgressByID = (
	id: number,
	lastPageId: number
) => {
	const request = prisma.progress.update({
		where: {
			id: id
		},
		data: {
			lastPageId: lastPageId
		},
		select: selectProgressSettings
	})
	return ResolvePrismaRequest(request)
}


// Delete Progress By ID
export const DeleteProgressByID = (
	id: number
) => {
	const request = prisma.progress.delete({
		where: {
			id: id
		},
		select: selectProgressSettings
	})
	return ResolvePrismaRequest(request)
}