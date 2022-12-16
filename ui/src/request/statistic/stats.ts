import { generalHandling, GetRequest } from "../common"

interface Stats {
	entryCount: number
	userCount: number
	chapterCount: number
	threadCount: number
}

export const GetStats = async (token: string) => {
	try {
		const response = await GetRequest("/api/stats", token)
		const body = response.data.body
		const res: Stats = {
			entryCount: body.entryCount,
			userCount: body.userCount,
			chapterCount: body.chapterCount,
			threadCount: body.threadCount,
		}
		return res
	}
	catch (err) {
		return generalHandling(err)
	}
}