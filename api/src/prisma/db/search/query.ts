import prisma from "../../prisma"
import { ResolvePrismaRequest } from "../handling/handling"


export const FindEntriesByName = async (query: string) => {
	const request = prisma.entry.findMany({
		where: {
			name: {
				contains: query,
				mode: "insensitive"
			}
		}
	})
	return ResolvePrismaRequest(request)
}

export const FindChaptersByName = async (query: string) => {
	const request = await prisma.chapter.findMany({
		where: {
			name: {
				contains: query,
				mode: "insensitive"
			}
		}
	})
	return ResolvePrismaRequest(request)
}