import prisma from "../../prisma"
import { ResolvePrismaRequest } from "../handling/handling"

export const GetEntryCount = async () => {
	const request = prisma.entry.count()
	return ResolvePrismaRequest(request)
}

export const GetChapterCount = async () => {
	const request = prisma.chapter.count()
	return ResolvePrismaRequest(request)
}

export const GetUserCount = async () => {
	const request = prisma.user.count()
	return ResolvePrismaRequest(request)
}

export const GetThreadCount = async () => {
	const request = prisma.thread.count()
	return ResolvePrismaRequest(request)
}

export const GetPageCount = async () => {
	const request = prisma.page.count()
	return ResolvePrismaRequest(request)
}

